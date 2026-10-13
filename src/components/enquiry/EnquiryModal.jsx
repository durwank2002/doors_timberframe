import React, { useState } from 'react';
import {
  FileText,
  Send,
  MessageCircle,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Calendar,
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { validateEnquiryForm } from '../../utils/validators';
import { formatCurrency } from '../../utils/formatters';
import { generateWhatsAppLink } from '../../utils/whatsapp';
import { APP_CONFIG } from '../../utils/constants';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

export const EnquiryModal = ({ isOpen, onClose, targetProduct = null }) => {
  const { cartItems, subtotal } = useCart();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    projectStage: 'Ready for Doors',
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedQuoteId, setGeneratedQuoteId] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateEnquiryForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      showToast('Please correct the highlighted form errors.', 'error');
      return;
    }

    // Generate random quote reference ID
    const quoteId = `TC-RFQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedQuoteId(quoteId);
    setIsSubmitted(true);
    showToast(`Estimate request submitted! Ref: ${quoteId}`, 'success');

    // Future backend endpoint integration comment:
    // [API_ENDPOINT]/api/v1/enquiries - POST payload { quoteId, formData, cartItems, targetProduct }
  };

  const handleWhatsAppInstant = () => {
    let link = '';
    if (targetProduct) {
      link = generateWhatsAppLink({
        type: 'product_enquiry',
        data: targetProduct,
      });
    } else if (cartItems.length > 0) {
      link = generateWhatsAppLink({
        type: 'cart_quote',
        data: { items: cartItems, totalValue: subtotal },
      });
    } else {
      link = generateWhatsAppLink({ type: 'general', data: {} });
    }
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      location: '',
      projectStage: 'Ready for Doors',
      notes: '',
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title={isSubmitted ? 'Quotation Request Confirmed' : 'Request Official Millwork Quotation'}
      subtitle={
        isSubmitted
          ? `Reference ID: ${generatedQuoteId}`
          : 'Our timber engineering concierge will provide detailed CAD drawings and cost estimation'
      }
      maxWidth="max-w-2xl"
    >
      {isSubmitted ? (
        <div className="text-center py-8 space-y-5">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-serif font-bold text-stone-900">
              Quotation Request Received!
            </h3>
            <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-stone-900">{formData.name}</strong>. Our senior woodworking estimator will review your specifications and contact you at <strong className="text-stone-900">{formData.phone}</strong> within 4 business hours.
            </p>
          </div>

          {/* Reference Card */}
          <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl max-w-md mx-auto text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-stone-500">Quotation ID:</span>
              <span className="font-mono font-bold text-stone-900">{generatedQuoteId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Project Stage:</span>
              <span className="font-medium text-stone-800">{formData.projectStage}</span>
            </div>
            {formData.location && (
              <div className="flex justify-between">
                <span className="text-stone-500">Site Location:</span>
                <span className="font-medium text-stone-800">{formData.location}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-stone-200 pt-2 font-bold">
              <span>Status:</span>
              <span className="text-emerald-700">Under Architectural Review</span>
            </div>
          </div>

          {/* WhatsApp Direct Speed-up */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="whatsapp"
              size="md"
              icon={MessageCircle}
              onClick={handleWhatsAppInstant}
            >
              Send Ref via WhatsApp for Instant Fast-Track
            </Button>
            <Button variant="outline" size="md" onClick={handleReset}>
              Close & Continue Browsing
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Items Summary preview */}
          {(targetProduct || cartItems.length > 0) && (
            <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200/60 text-xs flex items-center justify-between">
              <div>
                <span className="font-bold text-amber-900 block">
                  {targetProduct ? `Quoting for: ${targetProduct.title}` : `Cart Estimation: ${cartItems.length} items`}
                </span>
                <span className="text-stone-600">
                  {targetProduct ? `Base Price: ${formatCurrency(targetProduct.price)}` : `Estimated Total: ${formatCurrency(subtotal)}`}
                </span>
              </div>
              <button
                type="button"
                onClick={handleWhatsAppInstant}
                className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center space-x-1"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp instead?</span>
              </button>
            </div>
          )}

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 block">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Vikram Malhotra"
                className={`w-full px-3.5 py-2.5 text-sm bg-stone-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  errors.name ? 'border-rose-400 bg-rose-50/30' : 'border-stone-300'
                }`}
              />
              {errors.name && <p className="text-[11px] text-rose-600">{errors.name}</p>}
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 block">
                Contact Phone / WhatsApp <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className={`w-full px-3.5 py-2.5 text-sm bg-stone-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-stone-300'
                  }`}
                />
              </div>
              {errors.phone && <p className="text-[11px] text-rose-600">{errors.phone}</p>}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 block">
                Email Address (Optional)
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="architect@studio.com"
                className={`w-full px-3.5 py-2.5 text-sm bg-stone-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  errors.email ? 'border-rose-400' : 'border-stone-300'
                }`}
              />
              {errors.email && <p className="text-[11px] text-rose-600">{errors.email}</p>}
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 block">
                Project City / Site Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Bangalore, Whitefield"
                className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Project Stage */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-stone-700 block">
                Current Construction Stage
              </label>
              <select
                name="projectStage"
                value={formData.projectStage}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="Ready for Doors">Masonry & Choukath Done (Ready for Doors Immediately)</option>
                <option value="Framing & Brickwork">Framing & Brickwork in progress (Need frames first)</option>
                <option value="Architectural Planning">Architectural Design / 3D Planning stage</option>
                <option value="Interior Renovation">Home Renovation / Replacing existing doors</option>
              </select>
            </div>

            {/* Notes */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-stone-700 block">
                Custom Requirements & Notes
              </label>
              <textarea
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleChange}
                placeholder="Specify any special carving requests, brass inlay patterns, wall thickness, or delivery constraints..."
                className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Backend Integration Note placeholder for code transparency */}
          {/* Note: In production with backend, submit triggers [API_ENDPOINT]/api/v1/quotes */}

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-stone-100">
            <Button variant="outline" size="md" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={Send}
            >
              Submit Quotation Request
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
