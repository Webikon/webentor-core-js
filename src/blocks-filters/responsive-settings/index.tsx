import { registerBlockExtension } from '@10up/block-components';
import { InspectorControls } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { addFilter, applyFilters } from '@wordpress/hooks';

import { WebentorConfig } from '@webentorCore/types/_webentor-config';

import { includedBlocks } from './constants';
import { BlockLinkPanel } from './settings/block-link';
import { ContainerPanel } from './settings/container';
import { SpacingPanel } from './settings/spacing';
import { generateClassNames, inlineStyleGenerator } from './utils';

const initResponsiveSettings = () => {
  // Make sure new attributes are present in blocks so we can conditionally show their settings
  addFilter(
    'blocks.registerBlockType',
    'webentor/addResponsiveSettingsAttributes',
    (settings, name) => {
      if (
        includedBlocks['blockLink'].includes(name) ||
        settings?.supports?.webentor?.blockLink
      ) {
        settings.attributes = {
          ...settings.attributes,
          ...{
            blockLink: {
              type: 'object',
              default: settings.attributes?.blockLink?.default || {},
            },
          },
        };
      }

      if (
        includedBlocks['display'].includes(name) ||
        settings?.supports?.webentor?.display
      ) {
        settings.attributes = {
          ...settings.attributes,
          ...{
            display: {
              type: 'object',
              default: settings.attributes?.display?.default || {
                // Default display is FLEX
                ...(settings?.supports?.webentor?.display === true
                  ? {
                      display: {
                        value: {
                          basic: 'flex',
                        },
                      },
                    }
                  : {}),
              },
              blockName: name,
            },
          },
        };
      }

      if (
        includedBlocks['spacing'].includes(name) ||
        settings?.supports?.webentor?.spacing
      ) {
        settings.attributes = {
          ...settings.attributes,
          ...{
            spacing: {
              type: 'object',
              default: settings.attributes?.spacing?.default || {},
            },
          },
        };
      }

      if (
        includedBlocks['grid'].includes(name) ||
        settings?.supports?.webentor?.grid
      ) {
        settings.attributes = {
          ...settings.attributes,
          ...{
            grid: {
              type: 'object',
              default: settings.attributes?.grid?.default || {},
            },
          },
        };
      }

      if (
        includedBlocks['gridItem'].includes(name) ||
        settings?.supports?.webentor?.gridItem
      ) {
        settings.attributes = {
          ...settings.attributes,
          ...{
            gridItem: {
              type: 'object',
              default: settings.attributes?.gridItem?.default || {},
            },
          },
        };
      }

      if (
        includedBlocks['flexbox'].includes(name) ||
        settings?.supports?.webentor?.flexbox
      ) {
        settings.attributes = {
          ...settings.attributes,
          ...{
            flexbox: {
              type: 'object',
              default: settings.attributes?.flexbox?.default || {},
            },
          },
        };
      }

      if (
        includedBlocks['flexboxItem'].includes(name) ||
        settings?.supports?.webentor?.flexboxItem
      ) {
        settings.attributes = {
          ...settings.attributes,
          ...{
            flexboxItem: {
              type: 'object',
              default: settings.attributes?.flexboxItem?.default || {},
            },
          },
        };
      }

      return settings;
    },
  );

  // Register block extension for all blocks
  registerBlockExtension('*', {
    extensionName: 'webentor.core.addResponsiveSettings',
    attributes: {},
    inlineStyleGenerator,
    classNameGenerator: generateClassNames,
    order: 'before',
    Edit: BlockEdit,
  });
};

const BlockEdit = (props) => {
  const breakpoints: string[] = applyFilters('webentor.core.twBreakpoints', [
    'basic',
  ]);
  const twTheme: WebentorConfig['theme'] = applyFilters(
    'webentor.core.twTheme',
    {},
  );

  return (
    <Fragment>
      <InspectorControls>
        <SpacingPanel {...props} breakpoints={breakpoints} twTheme={twTheme} />
        <ContainerPanel
          {...props}
          breakpoints={breakpoints}
          twTheme={twTheme}
        />
        <BlockLinkPanel {...props} />
      </InspectorControls>
    </Fragment>
  );
};

export { initResponsiveSettings };
