const base = import.meta.env.BASE_URL;
const clear = `${base}images/ortho/screens/clear/`;

export const media = {
  screeningList: {
    src: `${clear}screening-list-full.png`,
    width: 2880,
    height: 1800,
  },
  nurseCollection: {
    src: `${clear}nurse-collection-full.png`,
    width: 2880,
    height: 1800,
  },
  nurseScanSync: {
    src: `${base}images/ortho/screens/nurse-scan-sync.webp`,
    width: 1399,
    height: 637,
  },
  pedoConfirm: {
    src: `${clear}pedo-confirm-full.png`,
    width: 2880,
    height: 1800,
  },
  orthoQueue: {
    src: `${base}images/ortho/screens/ortho-queue.webp`,
    width: 2397,
    height: 829,
  },
  orthoConclusion: {
    src: `${clear}ortho-conclusion-full.png`,
    width: 2880,
    height: 1800,
  },
  scanAnalysis: {
    src: `${clear}scan-analysis-full.png`,
    width: 2880,
    height: 1800,
  },
  scienceModal: {
    src: `${clear}science-modal-full.png`,
    width: 2880,
    height: 1800,
  },
  panoramic: {
    src: `${base}images/ortho/screens/panoramic.webp`,
    width: 1181,
    height: 581,
  },
  analysisPage: {
    src: `${clear}analysis-page-full.png`,
    width: 2880,
    height: 1800,
  },
  nurseHistory: {
    src: `${base}images/ortho/screens/nurse-history.webp`,
    width: 960,
    height: 805,
  },
  reportPreview: {
    src: `${base}images/ortho/screens/report-preview.webp`,
    width: 1060,
    height: 1414,
  },
  reportCover: {
    src: `${base}images/ortho/screens/report-cover.webp`,
    width: 796,
    height: 1040,
  },
  reportFull: {
    src: `${clear}report-full.png`,
    width: 796,
    height: 6954,
    long: true,
  },
  reportModel: {
    src: `${clear}report-full.png`,
    width: 796.2266,
    height: 1067.1764,
    sourceWidth: 796,
    sourceHeight: 6954,
    // Figma 789:3500/789:3621: 479 × 642 viewport, image y=-982.327.
    // Keep the same source region in both the page and enlarged view.
    region: { x: -0.1133, y: 1632.8913, width: 796.2266, height: 1067.1764 },
  },
};
