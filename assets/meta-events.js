/* Mirror explicit GA4 events to Meta without changing the GA4 payload. */
(function () {
  var standardEvents = {
    generate_lead: 'Lead',
    sign_up: 'CompleteRegistration',
    contact_click: 'Contact',
    view_item: 'ViewContent',
    add_to_cart: 'AddToCart',
    begin_checkout: 'InitiateCheckout',
    purchase: 'Purchase',
    search: 'Search'
  };

  window.dearYouMetaEvent = function (name, params) {
    if (typeof window.fbq !== 'function' || name === 'page_view' || /scroll/i.test(name)) return;
    if (name === 'purchase') {
      var rawValue = params && params.value;
      // Never invent a purchase amount when the GA4 event has no valid value.
      if (rawValue == null || (typeof rawValue !== 'number' && typeof rawValue !== 'string') || String(rawValue).trim() === '') return;
      var value = Number(rawValue);
      if (!isFinite(value) || value < 0) return;
      if (window.fbq) fbq('track', 'Purchase', { value: value, currency: 'KRW' });
    } else if (Object.prototype.hasOwnProperty.call(standardEvents, name)) {
      if (window.fbq) fbq('track', standardEvents[name]);
    } else {
      if (window.fbq) fbq('trackCustom', name);
    }
  };
})();
