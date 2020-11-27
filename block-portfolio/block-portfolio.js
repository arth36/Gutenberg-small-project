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
//apiFetch = wp.apiFetch;

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

        if( ! props.attributes.portfolio ) {
            wp.apiFetch({
                url: 'http://localhost/wordpress/wp-json/wp/v2/portfolio/?per_page=100'
            }).then( portfolio => {
                props.setAttributes({
                    portfolio: portfolio,
                })
            } )
        }

        if( ! props.attributes.portfolio ) {
            return 'Loading...';
        }

        if( props.attributes.portfolio && props.attributes.portfolio.length === 0 ) {
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
                        value={ props.attributes.postPerPage }
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
                            value = { props.attributes.portfolioBlockTitle }
                            onChange = { onChangePortfolioBlockTitle }                    
                />

                <div>
                    
                        {
                            props.attributes.portfolio.map( portfolio => {
                                return (
                                    console.log(portfolio.featured_media)
                                );
                            } )
                        }
                    
                </div>

            </div>

        ]);
    },

    save(){

        return null;

    },

});