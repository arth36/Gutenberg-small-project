import './style.scss'

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
    },

    // built-in functions

    edit({ attributes, setAttributes }) {

        const {

            coverImage,
            coverTitle,
            
        } = attributes;
        
        // custom functions

        function onSelectImage(newImage){
            setAttributes( { coverImage: newImage.sizes.full.url } );
        }

        function onChangeCoverTitle(newCoverTitle){
            setAttributes( { coverTitle: newCoverTitle } );
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

            <div class="banner" style = { { background: `url("${ coverImage }")` } }>
                <RichText   key = "editable"
                            tagName = "h1"
                            className = "cover-title"
                            placeholder = "Add Cover Title"
                            value = { coverTitle }
                            onChange = { onChangeCoverTitle }
                            
                />

                
            </div>
        ]);
    },

    save({ attributes }) {

        const {

            coverImage,
            coverTitle,
            
        } = attributes;

        return (
            <div class="banner" style = { { background: `url("${ coverImage }")` } }>
                <h1 className="cover-title">{ coverTitle }</h1>
            </div>
        );
    },
});