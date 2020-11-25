import '../block-cover/block-cover.js'
import '../block-portfolio/block-portfolio.js'

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

registerBlockType( 'gutenberg-project/custom-cta', {

    // built-in attributes

    title: 'Call to Action',
    description: 'Block to generate a custom call to Action',
    icon: 'format-image',
    category: 'layout',

    // custom attributes

    attributes: {
        title: {
            type: 'string',
            source: 'html',
            selector: 'h2',
        },
        titleColor: {
            type: 'string',
            default: 'black',
        },
        body: {
            type: 'string',
            source: 'html',
            selector: 'p',
        },
        bodyColor: {
            type: 'string',
            default: 'black',
        },
        backgroundImage: {
            type: 'string',
            default: null,
        },
        alignment: {
            type: 'string',
            default: 'none',
        },
    },

    // built-in functions

    edit({ attributes, setAttributes }) {

        const {
            title,
            titleColor,
            bodyColor,
            body,
            backgroundImage,
            alignment,
        } = attributes;

        // custom functions
        function onChangeTitle(newTitle){
            setAttributes( { title: newTitle } );
        }

        function onChangeBody(newBody){
            setAttributes( { body: newBody } );
        }

        function onTitleColorChange(newTitleColor){
            setAttributes( { titleColor: newTitleColor } );
        }

        function onBodyColorChange(newBodyColor){
            setAttributes( { bodyColor: newBodyColor } );
        }

        function onSelectImage(newImage){
            setAttributes( { backgroundImage: newImage.sizes.full.url } );
        }

        function onChangeAlignment(newAlignment){
            setAttributes( { alignment: newAlignment === undefined ? 'none' : newAlignment } )
        }

        return([
            <InspectorControls style={{ marginBottom : '40px' }}>
                <PanelBody title={ 'Font Color Settings' }>
                    <p><strong>Select a Title Color:</strong></p>
                    <ColorPalette   value = {titleColor}
                                    onChange = { onTitleColorChange } />
                    <p><strong>Select a Body Color:</strong></p>
                    <ColorPalette   value = {bodyColor}
                                    onChange = { onBodyColorChange } />
                </PanelBody>

                <PanelBody title={ 'Backgroyund Image Settings' }>
                    <p><strong>Select a Background Image:</strong></p>
                    <MediaUpload 
                        onSelect = { onSelectImage }
                        type = "image"
                        value = { backgroundImage }
                        render = { ( { open } ) => (
                            <IconButton 
                                onClick = { open }
                                icon = "upload"
                                className = "editor-media-placeholder__button is-button is-default is-large"
                            >
                                Background Image
                            </IconButton>
                         ) }
                    />
                </PanelBody>
            </InspectorControls>,
            
            <div class="cta-container" style={ {
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            } }>
                {
                    <BlockControls>
                        <AlignmentToolbar   value = { alignment } 
                                            onChange = { onChangeAlignment }
                        />
                    </BlockControls>
                }
                <RichText   key = "editable"
                            tagName = "h2"
                            className = "cta-title"
                            placeholder = "Your CTA Title"
                            value = { title }
                            onChange = { onChangeTitle }
                            style = { { color:titleColor, textAlign: alignment } }
                />

                <RichText   key = "editable"
                            tagName = "p"
                            placeholder = "Your CTA Description"
                            value = { body }
                            onChange = { onChangeBody }
                            style = { { color:bodyColor } }
                />

            </div>
        ]);
    },

    save({ attributes }) {

        const {
            title,
            titleColor,
            bodyColor,
            body,
            backgroundImage,
            alignment,
        } = attributes;

        return (
            <div className="cta-container" style={ {
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            } }>
                <h2 className="cta-title" style={ { color: titleColor, textAlign: alignment } }>{ title }</h2>
                <RichText.Content   tagName = "p"
                                    value = { body }
                                    style = { { color: bodyColor } } />
            </div>
        );
    }

});