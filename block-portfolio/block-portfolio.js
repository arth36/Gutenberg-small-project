const { registerBlockType } = wp.blocks;
const { 
    RichText, 
    InspectorControls,
    ColorPalette,
    MediaUpload,
    BlockControls,
    AlignmentToolbar,
} = wp.editor;
const { PanelBody, IconButton, RangeControl } = wp.components;
const { withState } = wp.compose;

registerBlockType( 'gutenberg-project/portfolio', {
    title: 'Portfolio Block',
    description: 'Block to generate a custom Portfolio Block',
    icon: 'format-image',
    category: 'layout',

    // custom attributes

    attributes: {
        portfolio: {
            type: 'object',
        },
        portfolioBlockTitle: {
            type: 'string',
        },
        postPerPage: {
            type: 'number',
        },
    },

    // built-in functions

    edit( props ) {

        var propsPortfolio = props.attributes.portfolio;
        var propsAttr = props.attributes;

        const {
            attributes
        } = props;

        if( ! propsPortfolio ) {
            wp.apiFetch({
                url: 'http://localhost/wordpress/wp-json/wp/v2/portfolio'
            }).then( portfolio => {
                props.setAttributes({
                    portfolio: portfolio,
                })
            } )
        }

        if( ! propsPortfolio ) {
            return 'Loading...';
        }

        if( propsPortfolio && propsPortfolio.length === 0 ) {
            return 'No portfolio found... please add some';
        }

        function onChangePortfolioBlockTitle(newPortfolioBlockTitle){
            props.setAttributes({
                portfolioBlockTitle : newPortfolioBlockTitle,
            });
        }

        function onChangeNumberOfPostPerPage(newNumberOfPostPerPage){
            props.setAttributes({
                postPerPage : newNumberOfPostPerPage,
            });
        }

        return([

            <InspectorControls style={{ marginBottom : '40px' }}>
                
                <PanelBody title="Number of posts per page">

                    <RangeControl 
                    
                        label={ 'Number of posts per page' }
                        value={ propsAttr.postPerPage }
                        onChange={ onChangeNumberOfPostPerPage }
                        initialPosition={ 3 }
                        min={ 3 }
                        max={ 30 }
                        step={ 3 }
                    
                    />

                </PanelBody>

            </InspectorControls>,

            <div>
                <label>Add Portfolio block Title. ( which will reflect at frontend. )</label>
                <br/>
                <RichText   key = "editable"
                            tagName = "p"
                            placeholder = "Add Portfolio Title"
                            value = { propsAttr.portfolioBlockTitle }
                            onChange = { onChangePortfolioBlockTitle }                    
                />
            </div>

        ]);
    },

    save(){

        return null;

    },

});