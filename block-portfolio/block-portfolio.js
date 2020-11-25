const { registerBlockType } = wp.blocks;
const { 
    RichText, 
    InspectorControls,
    ColorPalette,
    MediaUpload,
    BlockControls,
    AlignmentToolbar,
} = wp.editor;
const { PanelBody, IconButton } = wp.components;
//apiFetch = wp.apiFetch;

registerBlockType( 'gutenberg-project/portfolio', {
    title: 'Portfolio Block',
    description: 'Block to generate a custom Portfolio Block',
    icon: 'format-image',
    category: 'layout',

    // custom attributes

    attributes: {
        portfolioBlockTitle: {
            type: 'string',
        },
        postPerPage: {
            type: 'string',
        },
        columns: {
            type: 'string',
        }
    },

    // built-in functions

    edit( props ) {

        function onChangePortfolioBlockTitle(e){
            props.setAttributes({
                portfolioBlockTitle : e.target.value,
            });
        }

        function onChangeNumberOfPostPerPage(e){
            props.setAttributes({
                postPerPage : e.target.value,
            });
        }

        function onChangeNumberOfColumns(e){
            props.setAttributes({
                columns : e.target.value,
            });
        }

        return(
            <div>
                <label>Add Portfolio block Title. ( which will reflect at frontend. )</label>
                <br/>
                <input type="text" onBlur={ onChangePortfolioBlockTitle } value={ props.attributes.portfolioBlockTitle } required />
                <br/>
                <br/>
                <label>number of post per page</label>
                <br/>
                <input type="text" onBlur={ onChangeNumberOfPostPerPage } value={ props.attributes.postPerPage } required />
            </div>
        );
    },

    save(){

        return null;

    },

});