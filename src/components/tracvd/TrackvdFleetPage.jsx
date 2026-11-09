import React, { useState } from 'react';

const ROOT = 'https://prohori.com/wp-content/uploads/';
const asset = (path) => ROOT + path;
const CLIENTS = [
    '2025/08/client-2.png', '2025/08/client-3-1.png', '2025/08/client-1.png',
    '2025/08/client-11.png', '2025/08/client-4.png', '2025/08/client-7.png',
    '2025/08/Pandora-1.png', '2025/08/Horizon-Group-1.png', '2026/06/akij-group-logo.png'
];
const FEATURES = [
    {
        title: 'গাড়ি কোথায় আছে জানতে পারবেন?',
        description: 'আপনার গাড়ি কোথায় আছে, কোন রাস্তায় চলছে এবং কোথায় থেমেছে—সব তথ্য সহজে দেখতে পারবেন।',
        detail: 'লাইভ লোকেশন ও গাড়ির গতিবিধি একই জায়গায় দেখুন।',
        bullets: ['লাইভ ম্যাপে গাড়ির অবস্থান দেখুন', 'গাড়ির চলাচলের আপডেট পান'],
        image: '2025/08/Fleet-2-300x251.png', caption: 'একনজরে দেখুন গাড়ির বর্তমান অবস্থান',
        background: 'bg-white', button: 'bg-sky-500 hover:bg-sky-600', captionColor: 'text-sky-500'
    },
    {
        title: 'আমার গাড়ির সংখ্যা তো অনেক, প্রতিটি গাড়ির আলাদা আলাদা তথ্য জানা যাবে?',
        description: 'একাধিক গাড়ির তথ্য এক জায়গা থেকে দেখার জন্য Trackvd-এর ফ্লিট ম্যানেজমেন্ট সলিউশন।',
        detail: 'আপনার সব গাড়ির তথ্য একসঙ্গে দেখুন।',
        bullets: ['প্রতিটি গাড়ির আলাদা তথ্য দেখুন', 'এক ড্যাশবোর্ডে পুরো ফ্লিট পর্যবেক্ষণ করুন'],
        image: '2025/08/Fleet-3-300x256.png', caption: 'সব গাড়ির তথ্য এক জায়গায়',
        background: 'bg-white', reverse: true, button: 'bg-sky-500 hover:bg-sky-600', captionColor: 'text-teal-500'
    },
    {
        title: 'ফুয়েল কতটুকু আছে বা কতক্ষণ পরে রিফিল করতে হবে সেটা জানা যাবে?',
        description: 'ফুয়েল সংক্রান্ত তথ্য ও ব্যবহার পর্যবেক্ষণের সুবিধা দিয়ে গাড়ি পরিচালনা আরও সহজ করুন।',
        detail: 'ফুয়েলের ব্যবহার বুঝুন, পরিকল্পনা করুন।',
        bullets: ['ফুয়েল ব্যবহারের তথ্য পর্যবেক্ষণ করুন', 'অস্বাভাবিক পরিবর্তন শনাক্ত করতে সহায়তা পান'],
        image: '2025/08/Fleet-4.png', caption: 'কোন গাড়ি কতটুকু ফুয়েল ব্যবহার করছে?',
        background: 'bg-[#defaff]', button: 'bg-orange-400 hover:bg-orange-500', captionColor: 'text-sky-500'
    },
    {
        title: 'গাড়ি নির্দিষ্ট গন্তব্যে পৌঁছালে অটোমেটিক জানা যাবে?',
        description: 'নির্ধারিত এলাকার ভেতরে গাড়ি প্রবেশ বা বের হওয়ার তথ্য জানতে জিওফেন্সিং সুবিধা ব্যবহার করুন।',
        detail: 'আপনার নির্ধারিত জায়গায় গাড়ির অবস্থান সম্পর্কে জানুন।',
        bullets: ['নির্দিষ্ট এলাকা সেট করার সুবিধা', 'এলাকায় প্রবেশ ও বের হওয়ার আপডেট'],
        image: '2025/08/Fleet-5.png', caption: 'গাড়ি পৌঁছালে আপডেট জানুন',
        background: 'bg-white', reverse: true, button: 'bg-orange-400 hover:bg-orange-500', captionColor: 'text-orange-400'
    },
    {
        title: 'ড্রাইভার মিথ্যা বলছে না তো?',
        description: 'গাড়ির অবস্থান ও যাতায়াতের তথ্য দেখে ড্রাইভারের দেওয়া তথ্য যাচাই করতে পারবেন।',
        detail: 'Trackvd ট্র্যাকিংয়ে থাকুন নিশ্চিন্ত।',
        bullets: ['গাড়ির অবস্থান ও চলাচলের ইতিহাস দেখুন', 'রুট ও থামার তথ্য যাচাই করুন'],
        image: '2025/08/Fleet-6.png', caption: 'কোথায় আছে গাড়ি? গতিবিধি কী ছিল?',
        background: 'bg-[#ffecd6]', button: 'bg-purple-600 hover:bg-purple-700', captionColor: 'text-purple-700'
    },
    {
        title: 'খাতায় না লিখেও পূর্ণ হিসাব রাখা সম্ভব?',
        description: 'গাড়ির চলাচল, ট্রিপ ও অন্যান্য গুরুত্বপূর্ণ তথ্য রিপোর্ট আকারে দেখে সহজে হিসাব রাখুন।',
        detail: 'Trackvd-এর রিপোর্টিং সুবিধায় তথ্য গুছিয়ে রাখুন।',
        bullets: ['ট্রিপ ও চলাচলের রিপোর্ট দেখুন', 'গাড়ির কার্যক্রম বিশ্লেষণ করুন', 'প্রয়োজনীয় তথ্য দ্রুত খুঁজে পান'],
        image: '2025/08/Fleet-7-300x244.png', caption: 'গাড়ির হিসাব দেখুন সহজেই',
        background: 'bg-white', reverse: true, button: 'bg-fuchsia-700 hover:bg-fuchsia-800', captionColor: 'text-fuchsia-700'
    }
];

function FeatureSection({ item, index }) {
    return (
        <section className={`${item.background} relative overflow-hidden`}>
            <div className={`mx-auto max-w-6xl px-5 py-16 md:py-24 grid items-center gap-10 md:gap-16 md:grid-cols-2 ${item.reverse ? 'md:[&_.feature-visual]:order-first' : ''}`}>
                <div className="feature-copy space-y-5">
                    <h2 className="text-[24px] md:text-[30px] font-semibold leading-[1.45] text-slate-700">{item.title}</h2>
                    <p className="text-sm md:text-base leading-8 text-slate-600">{item.description}</p>
                    <p className="font-medium text-slate-700">{item.detail}</p>
                    <ul className="space-y-3 text-sm md:text-base text-slate-600">
                        {item.bullets.map((bullet) => <li key={bullet} className="flex gap-3 items-start"><span className={`mt-2 h-2 w-2 rounded-full shrink-0 ${item.button.split(' ')[0]}`} />{bullet}</li>)}
                    </ul>
                    <a href="#trackvd-contact" className={`inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold text-white transition ${item.button}`}>আরও জানুন</a>
                </div>
                <div className="feature-visual flex flex-col items-center justify-center gap-4 text-center">
                    <img loading="lazy" src={asset(item.image)} alt={item.title} className="max-h-[320px] w-full max-w-[420px] object-contain" />
                    <p className={`max-w-xs text-lg md:text-xl font-semibold leading-8 ${item.captionColor}`}>{item.caption}</p>
                </div>
            </div>
            {index !== FEATURES.length - 1 && <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-1/2 h-12 w-12 -translate-x-1/2 translate-y-1/2 rounded-full border-[10px] border-white/70 opacity-60" />}
        </section>
    );
}

function ContactForm({ onSubmit }) {
    const [values, setValues] = useState({ name: '', phone: '', vehicle: '' });
    const [status, setStatus] = useState('');
    const update = (key, value) => setValues(prev => ({ ...prev, [key]: value }));
    const submit = async (event) => {
        event.preventDefault();
        if (!onSubmit) { setStatus('ফর্ম পাঠানোর জন্য Trackvd API সংযুক্ত করতে হবে।'); return; }
        try { await onSubmit(values); setStatus('আপনার তথ্য জমা হয়েছে।'); setValues({ name: '', phone: '', vehicle: '' }); }
        catch { setStatus('তথ্য পাঠানো যায়নি। আবার চেষ্টা করুন।'); }
    };
    return <form id="trackvd-contact" onSubmit={submit} className="overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="flex items-center justify-between gap-4 bg-[#ff891f] px-6 py-5 text-white">
            <h2 className="text-lg font-bold leading-7">Trackvd সম্পর্কে জানতে<br />আমাদের সাথে যোগাযোগ করুন</h2>
            <img src={asset('2026/06/Corporate-Support-icon.webp')} alt="Customer support" className="h-16 w-16 object-contain" />
        </div>
        <div className="space-y-4 p-6">
            <label className="block text-sm font-medium text-slate-700">আপনার নাম<input required value={values.name} onChange={e => update('name', e.target.value)} placeholder="আপনার নাম" className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-orange-400" /></label>
            <label className="block text-sm font-medium text-slate-700">মোবাইল নম্বর<input required type="tel" value={values.phone} onChange={e => update('phone', e.target.value)} placeholder="মোবাইল নম্বর" className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-orange-400" /></label>
            <label className="block text-sm font-medium text-slate-700">গাড়ির সংখ্যা<input required value={values.vehicle} onChange={e => update('vehicle', e.target.value)} placeholder="গাড়ির সংখ্যা" className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-orange-400" /></label>
            <button type="submit" className="rounded-md bg-[#ff891f] px-8 py-3 font-semibold text-white hover:bg-orange-600">সাবমিট করুন</button>
            {status && <p role="status" className="text-sm text-slate-600">{status}</p>}
        </div>
    </form>;
}

/** Pass onLeadSubmit={async (values) => { ... }} to connect your existing API. */
export default function TrackvdFleetPage({ onLeadSubmit, phone = '', whatsappUrl = '', extraClients = [] }) {
    const [showAll, setShowAll] = useState(false);
    const clients = [...CLIENTS, ...extraClients];
    const visibleClients = showAll ? clients : clients.slice(0, 9);
    return <main className="font-sans text-slate-800">
        <section className="bg-[#e7e7e7]">
            <div className="mx-auto max-w-6xl px-5 pt-7 pb-16 md:pb-24">
                <img src={asset('2026/09/prohori-gps-tracker-server-banner-1024x240.webp')} alt="GPS tracking service promotional banner" className="mx-auto mb-10 block w-full max-w-[1024px] object-contain" />
                <div className="grid items-start gap-10 md:grid-cols-[1.15fr_0.85fr]">
                    <div className="space-y-5 md:pt-5">
                        <h1 className="text-2xl md:text-3xl font-bold leading-[1.5]">Trackvd-এর সাথে আপনার গাড়ির নিরাপত্তা ও ফ্লিট ম্যানেজমেন্ট আরও সহজ</h1>
                        <ul className="list-disc space-y-2 pl-6 text-base leading-7"><li>এক জায়গায় গাড়ির অবস্থান দেখুন</li><li>আপনার ফ্লিট পরিচালনা করুন সহজে</li></ul>
                        <p className="font-bold">Talk To Expert</p>
                        <div className="flex flex-wrap gap-3">
                            {phone && <a className="rounded bg-[#ff891f] px-5 py-3 text-sm font-semibold text-white" href={`tel:${phone}`}>☎ {phone}</a>}
                            {whatsappUrl && <a className="rounded bg-[#ff891f] px-5 py-3 text-sm font-semibold text-white" href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a>}
                            {!phone && !whatsappUrl && <a className="rounded bg-[#ff891f] px-5 py-3 text-sm font-semibold text-white" href="#trackvd-contact">যোগাযোগ করুন</a>}
                        </div>
                    </div>
                    <ContactForm onSubmit={onLeadSubmit} />
                </div>
                <div className="pt-20 text-center">
                    <h2 className="text-xl md:text-2xl font-semibold text-slate-600">আমাদের কর্পোরেট ক্লায়েন্টসমূহ</h2>
                    <div className="mx-auto mt-4 h-px w-24 bg-slate-400" />
                    <div className="mx-auto mt-9 grid max-w-5xl grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6 md:gap-3">
                        {visibleClients.map((img, index) => <div key={`${img}-${index}`} className="flex aspect-square items-center justify-center border border-slate-200 bg-white p-4 shadow-sm"><img loading="lazy" src={img.startsWith('http') ? img : asset(img)} alt={`Client logo ${index + 1}`} className="max-h-full max-w-full object-contain" /></div>)}
                    </div>
                    {clients.length > 9 && <button type="button" onClick={() => setShowAll(v => !v)} className="mt-8 rounded-full bg-[#ff891f] px-7 py-3 text-sm font-semibold text-white hover:bg-orange-600">{showAll ? 'কম দেখুন' : 'More Clients'}</button>}
                </div>
            </div>
        </section>
        {FEATURES.map((item, index) => <FeatureSection key={item.title} item={item} index={index} />)}
        <div className="flex justify-center bg-white py-8"><button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top" className="rounded-full bg-[#ff891f] px-4 py-3 font-bold text-white shadow-lg">↑</button></div>
    </main>;
}
