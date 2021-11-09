(function() {
  const STORAGE_KEY = "visionBlockEnabled"; // match background.js
  const LAYER_ID = "layer-toggle-1317785004";
  const LAYER_CSS = `position: fixed !important;
    inset: 0 !important;
    padding: 0 !important;
    margin: 0 !important;
    background: black !important;
    pointer-events: none !important;
    z-index: 2147483647 !important;
    transform: none !important;`;

  /**
   * @param {string} id
   * @returns {HTMLElement}
   */
  const createLayer = (id) => {
    const layer = document.createElement("div");
    layer.id = id;
    layer.insertAdjacentHTML('afterbegin', `<style>
      html, body {
        background: black !important;
      }

      #${id} {
        ${LAYER_CSS}
      }

      #${id} ~ * {
        z-index: 0 !important;
      }
    </style>`)
    return layer;
  };

  /**
   * @returns {HTMLElement}
   */
  const getLayer = () => {
    return document.getElementById(LAYER_ID) || createLayer(LAYER_ID);
  }

  /**
   *
   * @param {HTMLElement} layer
   * @returns {boolean}
   */
  const isLayerActive = (layer) => {
    return document.body.contains(layer);
  };

  /**
   * @param {HTMLElement} layer
   * @param {boolean=} active
   * @returns {void}
   */
  const toggleLayer = (layer, active) => {
    const currentlyActive = isLayerActive(layer);

    let shouldActivateLayer = !currentlyActive;

    if (typeof active === "boolean") {
      shouldActivateLayer = active;
    }

    if (shouldActivateLayer === currentlyActive) return;

    if (shouldActivateLayer) {
      document.body.append(layer);
    } else {
      layer.remove();
    }
  };

  chrome.storage.local.get(STORAGE_KEY, (result) => {
    const layer = getLayer();
    toggleLayer(layer, result[STORAGE_KEY]);
  });
}());
