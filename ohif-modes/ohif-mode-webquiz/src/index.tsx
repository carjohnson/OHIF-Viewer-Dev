import toolbarButtons from './toolbarButtons';
import { hotkeys } from '@ohif/core';
import { id } from './id';
import i18n from 'i18next';
import initToolGroups from './initToolGroups';

const configs = {
  Length: {},
  //
};
const ohif = {
  layout: '@ohif/extension-default.layoutTemplateModule.viewerLayout',
  sopClassHandler: '@ohif/extension-default.sopClassHandlerModule.stack',
  hangingProtocol: '@ohif/extension-default.hangingProtocolModule.default',
  leftPanel: '@ohif/extension-default.panelModule.seriesList',
  // rightPanel: '@ohif/extension-cornerstone.panelModule.panelMeasurement',
};

const cornerstone = {
  segpanel: '@ohif/extension-cornerstone.panelModule.panelSegmentation',
  measurements: '@ohif/extension-cornerstone.panelModule.panelMeasurement',
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

    onModeEnter:({servicesManager, extensionManager }: withAppTypes) => {
      const { measurementService, toolbarService, toolGroupService } =
        servicesManager.services;

      measurementService.clearMeasurements();

      // Init Default and SR ToolGroups
      initToolGroups(extensionManager, toolGroupService, commandsManager);

    
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
              leftPanels: [ohif.leftPanel],
              leftPanelResizable: true,
              rightPanels: [ 'ohif-extension-webquiz.panelModule.webquiz', cornerstone.measurements, cornerstone.segpanel],
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