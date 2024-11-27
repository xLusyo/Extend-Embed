import { __, ___ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow } from '@wordpress/components';
import { __experimentalUnitControl as UnitControl } from '@wordpress/components';

function addHeightControls( BlockEdit ) {
    return ( props ) => {
        const { name, attributes, setAttributes } = props;

        if ( name !== 'core/embed' ) {
            return <BlockEdit { ...props }/>;
        }

        const { height } = attributes;

        return (
            <>
                <BlockEdit { ...props }/>
                <InspectorControls>
                    <PanelBody title={ __('Height')}>
                        <PanelRow>
                            <UnitControl 
                                label={'Height'}
                                value={height}
                                onChange={(newHeight)=>{
                                    setAttributes({height:newHeight})
                                }}
                                units={[
                                    {
                                      a11yLabel: 'Pixels (px)',
                                      label: 'px',
                                      step: 1,
                                      value: 'px'
                                    }
                                  ]}
                            />
                        </PanelRow>
                    </PanelBody>
                </InspectorControls>
            </>
        )
    }
}

addFilter('editor.BlockEdit', 'embed-extend/add-height-controls', addHeightControls);

function addHeightStyles( props, blockType, attributes ){
    const { name } = blockType;
    const { height } = attributes;

    if ( name === 'core/embed') {
        return {
            ...props,
            style : { height: height }
        }
    }
}

addFilter('blocks.getSaveContent.extraProps', 'embed-extend/add-height-styles', addHeightStyles);