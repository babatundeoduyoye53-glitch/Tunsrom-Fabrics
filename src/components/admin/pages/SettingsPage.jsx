import { useEffect, useState } from 'react';
import { Check, Loader2, MessageCircle, Plus, Store, Trash2, Lock, Globe } from 'lucide-react';
import {
  fetchSettings,
  saveStoreInfo,
  saveWhatsAppConfig,
  saveDeliveryZones,
  saveSocialLinks,
  changeAdminPassword,
} from '../../../api/settings';

// ─── Reusable components ────────────────────────────────────────────

function SectionCard({ icon: Icon, title, description, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#161b22] p-6 lg:p-8">
      <div className="mb-6 flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C9A84C]/15 text-[#C9A84C]">
          <Icon size={20} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-[#f0ece4]">{title}</h2>
          {description && <p className="mt-1 text-sm text-white/50">{description}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-[#f0ece4]">{label}</label>
      {hint && <p className="mb-2 text-xs text-white/40">{hint}</p>}
      {children}
    </div>
  );
}

function Input({ ...props }) {
  return (
    <input
      className="w-full rounded-xl border border-white/10 bg-[#0d1117] px-4 py-2.5 text-sm text-[#f0ece4] outline-none transition focus:border-[#C9A84C] placeholder:text-white/25"
      {...props}
    />
  );
}

function Textarea({ ...props }) {
  return (
    <textarea
      rows={3}
      className="w-full rounded-xl border border-white/10 bg-[#0d1117] px-4 py-2.5 text-sm text-[#f0ece4] outline-none transition focus:border-[#C9A84C] placeholder:text-white/25 resize-none"
      {...props}
    />
  );
}

function SaveButton({ loading, saved }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-xl bg-[#C9A84C] px-5 py-2.5 text-sm font-semibold text-[#0f0f0f] transition hover:bg-[#d4b566] disabled:opacity-60"
    >
      {loading ? (
        <><Loader2 size={15} className="animate-spin" /> Saving…</>
      ) : saved ? (
        <><Check size={15} /> Saved</>
      ) : (
        'Save changes'
      )}
    </button>
  );
}

function useSaveState() {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const run = async (fn) => {
    setLoading(true);
    setError('');
    setSaved(false);
    try {
      await fn();
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, saved, error, run };
}

// ─── Section: Store Info ────────────────────────────────────────────

function StoreInfoSection({ initial }) {
  const [form, setForm] = useState({
    storeName: initial?.storeName || '',
    tagline: initial?.tagline || '',
    email: initial?.email || '',
    phone: initial?.phone || '',
    address: initial?.address || '',
  });
  const { loading, saved, error, run } = useSaveState();

  useEffect(() => {
    if (initial) setForm({
      storeName: initial.storeName || '',
      tagline: initial.tagline || '',
      email: initial.email || '',
      phone: initial.phone || '',
      address: initial.address || '',
    });
  }, [initial]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    run(() => saveStoreInfo(form));
  };

  return (
    <SectionCard icon={Store} title="Store Information" description="Basic details shown across the storefront and contact pages.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Store name">
            <Input value={form.storeName} onChange={set('storeName')} placeholder="Tunsrom Fabrics" />
          </Field>
          <Field label="Tagline">
            <Input value={form.tagline} onChange={set('tagline')} placeholder="Premium fabrics for every occasion" />
          </Field>
          <Field label="Contact email">
            <Input type="email" value={form.email} onChange={set('email')} placeholder="tunsrom.fabrics@gmail.com" />
          </Field>
          <Field label="Phone number">
            <Input value={form.phone} onChange={set('phone')} placeholder="+234 8034619489" />
          </Field>
        </div>
        <Field label="Physical address">
          <Textarea value={form.address} onChange={set('address')} placeholder="Shop address, market, city…" />
        </Field>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <SaveButton loading={loading} saved={saved} />
      </form>
    </SectionCard>
  );
}

// ─── Section: WhatsApp Config ───────────────────────────────────────

function WhatsAppSection({ initial }) {
  const [form, setForm] = useState({
    whatsappNumber: initial?.whatsappNumber || '',
    whatsappOrderTemplate: initial?.whatsappOrderTemplate || '',
  });
  const { loading, saved, error, run } = useSaveState();

  useEffect(() => {
    if (initial) setForm({
      whatsappNumber: initial.whatsappNumber || '',
      whatsappOrderTemplate: initial.whatsappOrderTemplate || '',
    });
  }, [initial]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    run(() => saveWhatsAppConfig(form));
  };

  return (
    <SectionCard
      icon={MessageCircle}
      title="WhatsApp Order Config"
      description="The number all order messages are sent to. Change it here without touching any code."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field
          label="WhatsApp number"
          hint="Country code + number, no spaces or + sign. Example: 2348034619489"
        >
          <Input
            value={form.whatsappNumber}
            onChange={set('whatsappNumber')}
            placeholder="2348034619489"
          />
        </Field>
        <Field
          label="Order message template"
          hint="Use {items} for the product list and {total} for the order total."
        >
          <Textarea
            rows={4}
            value={form.whatsappOrderTemplate}
            onChange={set('whatsappOrderTemplate')}
            placeholder={"Hi, I'd like to order:\n{items}\n\nTotal: {total}"}
          />
        </Field>

        {/* Live preview */}
        <div className="rounded-xl border border-white/10 bg-[#0d1117] p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A84C]">Preview</p>
          <p className="whitespace-pre-wrap text-sm text-white/60">
            {(form.whatsappOrderTemplate || '')
              .replace('{items}', '1. Premium French Lace x1 - ₦45,000')
              .replace('{total}', '₦45,000')}
          </p>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}
        <SaveButton loading={loading} saved={saved} />
      </form>
    </SectionCard>
  );
}

// ─── Section: Delivery Zones ────────────────────────────────────────

function DeliverySection({ initial }) {
  const [zones, setZones] = useState(initial?.deliveryZones || []);
  const { loading, saved, error, run } = useSaveState();

  useEffect(() => {
    if (initial?.deliveryZones) setZones(initial.deliveryZones);
  }, [initial]);

  const updateZone = (index, key, value) => {
    setZones((current) =>
      current.map((z, i) => (i === index ? { ...z, [key]: value } : z)),
    );
  };

  const addZone = () => {
    setZones((current) => [...current, { zone: '', fee: 0, estimatedDays: '' }]);
  };

  const removeZone = (index) => {
    setZones((current) => current.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    run(() => saveDeliveryZones({ deliveryZones: zones }));
  };

  return (
    <SectionCard
      icon={Globe}
      title="Delivery Zones"
      description="Set delivery fees and estimated times per region."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {zones.map((zone, index) => (
          <div key={index} className="grid gap-3 rounded-xl border border-white/10 bg-[#0d1117] p-4 sm:grid-cols-[1fr_120px_140px_36px]">
            <Input
              value={zone.zone}
              onChange={(e) => updateZone(index, 'zone', e.target.value)}
              placeholder="Zone name (e.g. Lagos)"
            />
            <Input
              type="number"
              value={zone.fee}
              onChange={(e) => updateZone(index, 'fee', Number(e.target.value))}
              placeholder="Fee (₦)"
            />
            <Input
              value={zone.estimatedDays}
              onChange={(e) => updateZone(index, 'estimatedDays', e.target.value)}
              placeholder="e.g. 1-2 days"
            />
            <button
              type="button"
              onClick={() => removeZone(index)}
              className="flex items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 transition hover:bg-red-500/20"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addZone}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60 transition hover:border-[#C9A84C] hover:text-[#C9A84C]"
        >
          <Plus size={15} /> Add zone
        </button>

        {error && <p className="text-sm text-red-400">{error}</p>}
        <SaveButton loading={loading} saved={saved} />
      </form>
    </SectionCard>
  );
}

// ─── Section: Social Links ──────────────────────────────────────────

function SocialSection({ initial }) {
  const [form, setForm] = useState({
    instagram: initial?.instagram || '',
    facebook: initial?.facebook || '',
    tiktok: initial?.tiktok || '',
  });
  const { loading, saved, error, run } = useSaveState();

  useEffect(() => {
    if (initial) setForm({
      instagram: initial.instagram || '',
      facebook: initial.facebook || '',
      tiktok: initial.tiktok || '',
    });
  }, [initial]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    run(() => saveSocialLinks(form));
  };

  return (
    <SectionCard icon={Globe} title="Social Media Links" description="Links shown in the footer and contact page.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Instagram">
            <Input value={form.instagram} onChange={set('instagram')} placeholder="https://instagram.com/..." />
          </Field>
          <Field label="Facebook">
            <Input value={form.facebook} onChange={set('facebook')} placeholder="https://facebook.com/..." />
          </Field>
          <Field label="TikTok">
            <Input value={form.tiktok} onChange={set('tiktok')} placeholder="https://tiktok.com/@..." />
          </Field>
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <SaveButton loading={loading} saved={saved} />
      </form>
    </SectionCard>
  );
}

// ─── Section: Admin Password ────────────────────────────────────────

function AdminPasswordSection() {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [result, setResult] = useState(null);
  const { loading, saved, error, run } = useSaveState();

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    run(async () => {
      const data = await changeAdminPassword(form);
      setResult(data);
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    });
  };

  return (
    <SectionCard icon={Lock} title="Admin Password" description="Change the admin login password.">
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <Field label="Current password">
          <Input type="password" value={form.currentPassword} onChange={set('currentPassword')} placeholder="••••••••" />
        </Field>
        <Field label="New password">
          <Input type="password" value={form.newPassword} onChange={set('newPassword')} placeholder="Min. 6 characters" />
        </Field>
        <Field label="Confirm new password">
          <Input type="password" value={form.confirmPassword} onChange={set('confirmPassword')} placeholder="••••••••" />
        </Field>

        {error && <p className="text-sm text-red-400">{error}</p>}

        {result && (
          <div className="rounded-xl border border-[#C9A84C]/30 bg-[#C9A84C]/10 p-4 text-sm text-[#f0ece4]">
            <p className="font-semibold text-[#C9A84C]">Password verified ✓</p>
            <p className="mt-1 text-white/60">{result.message}</p>
            <p className="mt-2 break-all font-mono text-xs text-[#C9A84C]">{result.hashedPassword}</p>
            <p className="mt-1 text-xs text-white/40">Copy the hash above and set it as ADMIN_PASSWORD in your Render dashboard env vars.</p>
          </div>
        )}

        <SaveButton loading={loading} saved={saved} />
      </form>
    </SectionCard>
  );
}

// ─── Main Settings Page ─────────────────────────────────────────────

function SettingsPage() {
  const [settings, setSettings] = useState(null);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    fetchSettings()
      .then(setSettings)
      .catch((err) => setLoadError(err.message));
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-[#f0ece4]">Settings</h1>
        <p className="mt-1 text-white/50">Configure your store, WhatsApp orders, delivery, and admin account.</p>
      </div>

      {loadError && (
        <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          Failed to load settings: {loadError}
        </div>
      )}

      <div className="space-y-6">
        <StoreInfoSection initial={settings} />
        <WhatsAppSection initial={settings} />
        <DeliverySection initial={settings} />
        <SocialSection initial={settings} />
        <AdminPasswordSection />
      </div>
    </div>
  );
}

export default SettingsPage;
