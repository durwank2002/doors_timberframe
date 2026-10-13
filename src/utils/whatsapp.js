import { APP_CONFIG } from './constants';
import { formatCurrency } from './formatters';

/**
 * Generate formatted WhatsApp message URL for a product or custom door configuration
 * 
 * @param {Object} options
 * @param {string} options.type - 'product_enquiry' | 'custom_config' | 'cart_quote' | 'general'
 * @param {Object} options.data - Product details, configuration details, or cart items
 * @returns {string} WhatsApp wa.me URL
 */
export const generateWhatsAppLink = ({ type, data }) => {
  let text = '';

  switch (type) {
    case 'product_enquiry': {
      text = `*Hello ${APP_CONFIG.BRAND_NAME} Team!* 👋\n\n` +
        `I am interested in this door model:\n` +
        `🚪 *Model:* ${data.title} (SKU: ${data.sku})\n` +
        `🏷️ *Category:* ${data.categoryLabel || data.category}\n` +
        `🪵 *Standard Timber:* ${data.woodType}\n` +
        `📏 *Dimensions:* ${data.standardDimensions}\n` +
        `💰 *Estimated Price:* ${formatCurrency(data.price)}\n\n` +
        `Please share availability, customization options, and lead times.\n` +
        `Thank you!`;
      break;
    }

    case 'custom_config': {
      text = `*Hello ${APP_CONFIG.BRAND_NAME} Team!* 👋\n\n` +
        `I customized a bespoke door specification on your website:\n` +
        `🚪 *Door Design:* ${data.productTitle} (${data.productSku})\n` +
        `📏 *Dimensions:* ${data.heightInches}" H × ${data.widthInches}" W (${data.areaSqFt} sq.ft) × ${data.thicknessMm}mm thick\n` +
        `🪵 *Selected Timber:* ${data.woodSpecies.name}\n` +
        `🖼️ *Wooden Frame:* ${data.frameProfile.name} (${data.frameRft} running ft)\n` +
        `✨ *Finish:* ${data.finish.name}\n` +
        `🔒 *Hardware:* ${data.hardware.name}\n\n` +
        `📊 *Estimated Cost Breakdown:*\n` +
        `• Wood Shutter: ${formatCurrency(data.priceBreakdown.woodShutterCost)}\n` +
        `• Frame (Choukath): ${formatCurrency(data.priceBreakdown.frameCost)}\n` +
        `• Finish & Polish: ${formatCurrency(data.priceBreakdown.finishCost)}\n` +
        `• Hardware Set: ${formatCurrency(data.priceBreakdown.hardwareCost)}\n` +
        `• Craft Carving: ${formatCurrency(data.priceBreakdown.craftCarvingCost)}\n` +
        `*Grand Total (incl. GST): ${formatCurrency(data.priceBreakdown.grandTotal)}*\n\n` +
        `Please confirm this quotation and arrange a site measurement or consultation.`;
      break;
    }

    case 'cart_quote': {
      text = `*Hello ${APP_CONFIG.BRAND_NAME} Concierge!* 👋\n\n` +
        `I would like to request an official quotation for the following items in my selection:\n\n`;

      data.items.forEach((item, index) => {
        text += `${index + 1}. *${item.title}* (Qty: ${item.quantity})\n` +
          `   - Wood: ${item.woodSpecies ? item.woodSpecies.name : item.woodType}\n` +
          `   - Size: ${item.heightInches || item.standardDimensions ? `${item.heightInches}" × ${item.widthInches}"` : 'Standard'}\n` +
          `   - Price: ${formatCurrency(item.totalPrice * item.quantity)}\n\n`;
      });

      text += `💰 *Total Estimated Value: ${formatCurrency(data.totalValue)}*\n\n` +
        `Kindly provide delivery schedule and quotation document.`;
      break;
    }

    default: {
      text = `*Hello ${APP_CONFIG.BRAND_NAME} Concierge!*\n\n` +
        `I would like to enquire about your custom architectural wooden doors and frames portfolio.`;
    }
  }

  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${APP_CONFIG.WHATSAPP_NUMBER}?text=${encodedText}`;
};
