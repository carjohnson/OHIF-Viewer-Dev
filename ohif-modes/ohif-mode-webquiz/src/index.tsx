import i18n from 'i18next';
import { id } from './id';
import initToolGroups from './initToolGroups';
import toolbarButtons from './toolbarButtons';
import { hotkeys } from '@ohif/core';

const configs = {
  Length: {},
  //
};
const ohif = {
  layout: '@ohif/extension-default.layoutTemplateModule.viewerLayout',
  sopClassHandler: '@ohif/extension-default.sopClassHandlerModule.stack',
  thumbnailList: '@ohif/extension-default.panelModule.seriesList',
  hangingProtocol: '@ohif/extension-default.hangingProtocolModule.default',
};

const cornerstone = {
  measurements: '@ohif/extension-cornerstone.panelModule.panelMeasurement',
  segmentation: '@ohif/extension-cornerstone.panelModule.panelSegmentation',
  viewport: '@ohif/extension-cornerstone.viewportModule.cornerstone',
};

const extensionDependencies = {
  '@ohif/extension-default': '^3.0.0',
  '@ohif/extension-cornerstone': '^3.0.0',
  'ohif-extension-webquiz': '0/0/1',
};

function modeFactory({ modeConfiguration }) {
  return {
    id,
    routeName: 'webquiz',
    displayName: 'WebQuiz Mode',

    onModeEnter:({servicesManager, extensionManager, commandsManager }: withAppTypes) => {
      const { measurementService, toolbarService, toolGroupService, customizationService } =
        servicesManager.services;

      measurementService.clearMeasurements();

      // Init Default and SR ToolGroups
      initToolGroups(extensionManager, toolGroupService, commandsManager);

      // const utilityModule = extensionManager.getModuleEntry(
      //   '@ohif/extension-cornerstone.utilityModule.tools'
      // );

      // const { toolNames, Enums } = utilityModule.exports;

      // const tools = {
      //   active: [
      //     {
      //       toolName: toolNames.WindowLevel,
      //       bindings: [{ mouseButton: Enums.MouseBindings.Primary }],
      //     },
      //     {
      //       toolName: toolNames.Pan,
      //       bindings: [{ mouseButton: Enums.MouseBindings.Auxiliary }],
      //     },
      //     {
      //       toolName: toolNames.Zoom,
      //       bindings: [{ mouseButton: Enums.MouseBindings.Secondary }],
      //     },
      //     {
      //       toolName: toolNames.StackScroll,
      //       bindings: [{ mouseButton: Enums.MouseBindings.Wheel }],
      //     },
      //   ],
      //   passive: [
      //     { toolName: toolNames.Length },
      //     { toolName: toolNames.Bidirectional },
      //     { toolName: toolNames.Probe },
      //     { toolName: toolNames.EllipticalROI },
      //     { toolName: toolNames.CircleROI },
      //     { toolName: toolNames.RectangleROI },
      //     { toolName: toolNames.StackScroll },
      //     { toolName: toolNames.CalibrationLine },
      //   ],
      //   // enabled
      //   enabled: [{ toolName: toolNames.ImageOverlayViewer }],
      //   // disabled
      // };

      // toolGroupService.createToolGroupAndAddTools('default', tools);

      // toolbarService.register(toolbarButtons);
      // toolbarService.updateSection('primary', [
      //   'MeasurementTools',
      //   'Zoom',
      //   'WindowLevel',
      //   'Pan',
      //   'Layout',
      //   'MoreTools',
      // ]);
    
    },

    onModeExit: ({ servicesManager }: withAppTypes) => {
      const {
        toolGroupService,
        syncGroupService,
        segmentationService,
        cornerstoneViewportService,
        uiDialogService,
        uiModalService,
      } = servicesManager.services;

      uiDialogService.hideAll();
      uiModalService.hide();
      toolGroupService.destroy();
      syncGroupService.destroy();
      segmentationService.destroy();
      cornerstoneViewportService.destroy();
    },
    validationTags: {
      study: [],
      series: [],
    },
    /**
     * A boolean return value that indicates whether the mode is valid for the
     * modalities of the selected studies. For instance a PET/CT mode should be
     */
    isValidMode: ({ modalities }) => {
      return { valid: true };
    },
    routes: [
      {
        path: 'webquiz',
        layoutTemplate: ({ location, servicesManager }) => {
          return {
            id: ohif.layout,
            props: {
              leftPanels: [ohif.thumbnailList],
              leftPanelResizable: true,
              rightPanels: [ 'ohif-extension-webquiz.panelModule.webquiz', cornerstone.measurements, cornerstone.segmentation],
              viewports: [
                {
                  namespace: cornerstone.viewport,
                  displaySetsToDisplay: [ohif.sopClassHandler],
                },
              ],
            },
          };
        },
      },
    ],  //routes
    extensions: extensionDependencies,
    hangingProtocol: 'default',
    sopClassHandlers: [ohif.sopClassHandler],
  } //return
};  //mode factory

const mode = {
  id,
  modeFactory,
  extensionDependencies,
};

export default mode;