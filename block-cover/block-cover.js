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

registerBlockType( 'gutenberg-project/cover', {
    title: 'Cover Block',
    description: 'Block to generate a custom Banner Block',
    icon: 'format-image',
    category: 'layout',

    // custom attributes

    attributes: {
        coverImage: {
            type: 'string',
            default: null,
        },
        coverTitle: {
            type: 'string',
            source: 'html',
            selector: 'h1',
        },
        coverDescription: {
            type: 'string',
            source: 'html',
            selector: 'p',
        },
    },

    // built-in functions

    edit({ attributes, setAttributes }) {

        const {

            coverImage,
            coverTitle,
            coverDescription,
            
        } = attributes;
        
        // custom functions

        function onSelectImage(newImage){
            setAttributes( { coverImage: newImage.sizes.full.url } );
        }

        function onChangeCoverTitle(newCoverTitle){
            setAttributes( { coverTitle: newCoverTitle } );
        }

        function onChangeCoverDescription(newCoverDescription){
            setAttributes( { coverDescription: newCoverDescription } );
        }
        
        return ([

            <InspectorControls style={{ marginBottom : '40px' }}>
                
                <PanelBody title={ 'Cover Image Settings' }>
                    <p><strong>Select a Cover Image:</strong></p>
                    <MediaUpload 
                        onSelect = { onSelectImage }
                        type = "image"
                        value = { coverImage }
                        render = { ( { open } ) => (
                            <IconButton 
                                onClick = { open }
                                icon = "upload"
                                className = "editor-media-placeholder__button is-button is-default is-large"
                            >
                                Cover Image
                            </IconButton>
                         ) }
                    />
                </PanelBody>
            </InspectorControls>,

            <div>
                <RichText   key = "editable"
                            tagName = "h1"
                            className = "cover-title"
                            placeholder = "Add Cover Title"
                            value = { coverTitle }
                            onChange = { onChangeCoverTitle }                            
                />

                <RichText   key = "editable"
                            tagName = "p"
                            className = "cover-description"
                            placeholder = "Add Cover Description"
                            value = { coverDescription }
                            onChange = { onChangeCoverDescription }                            
                />
            </div>    
        ]);
    },

    save({ attributes }) {

        const {

            coverImage,
            coverTitle,
            coverDescription,
            
        } = attributes;

        return (
            


            <div class="banner-outer">
                <div class="banner-slider container">
                    <div class="slideDiv">
                        <div class="slide">
                            <img class="banner_img" src={ coverImage } />
                            <div class="banner-content">
                                
                                <h1>{ coverTitle }</h1>
                                
                                <div  class="container-wrapper">
                                    <p class="banner-disc">{ coverDescription }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        );
    },
});