import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { clinicConfig } from "@/lib/clinic-config";

const links = [
  { label: "Home", to: "/" },
  { label: "Treatments", to: "/treatments" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

function ClinicWordmark({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="inline-flex min-w-0 items-center gap-3" aria-label="Sanghari Dental Clinic home">
      <span className="grid size-11 shrink-0 place-items-center border border-clinic-blue/20 bg-secondary text-clinic-blue" aria-hidden="true">
        <span className="font-display text-xl font-extrabold">S</span>
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block font-display text-base font-extrabold text-clinic-navy">Sanghari</span>
        {!compact && <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Dental Clinic</span>}
      </span>
    </Link>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const whatsappNumber = clinicConfig.whatsappNumber?.replace(/\D/g, "");
  const phoneNumber = clinicConfig.phone?.replace(/\D/g, "");

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-clinic-navy text-primary-foreground">
        <div className="clinic-container flex min-h-9 items-center justify-between gap-3 py-2 text-xs">
          <p className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-clinic-teal" />Root canal care · Shirpur, Maharashtra</p>
          <span className="hidden sm:block">Thoughtful guidance for your next step</span>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur">
        <div className="clinic-container flex min-h-[76px] items-center justify-between gap-4">
          <ClinicWordmark />
          <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
            {links.map((link) => <Link key={link.to} to={link.to} className="text-sm font-semibold text-muted-foreground transition-colors hover:text-clinic-blue">{link.label}</Link>)}
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <Button asChild size="lg" className="hidden sm:inline-flex">
              <Link to="/book">Book an appointment <ArrowUpRight aria-hidden="true" /></Link>
            </Button>
            <Button asChild size="icon" variant="outline" className="hidden sm:inline-flex" aria-label={phoneNumber ? "Call the clinic" : "Clinic phone number not available"} title={phoneNumber ? "Call the clinic" : "Clinic phone number not available"} disabled={!phoneNumber}>
              {phoneNumber ? <a href={`tel:+${phoneNumber}`}><Phone aria-hidden="true" /></a> : <span><Phone aria-hidden="true" /></span>}
            </Button>
            <Button variant="outline" size="icon" className="md:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </Button>
          </div>
        </div>
        {menuOpen && <nav aria-label="Mobile navigation" className="clinic-container grid gap-1 border-t border-border py-3 md:hidden">
          {links.map((link) => <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)} className="px-2 py-3 text-sm font-semibold text-clinic-navy">{link.label}</Link>)}
          <Button asChild className="mt-2" onClick={() => setMenuOpen(false)}><Link to="/book">Book an appointment <ArrowUpRight aria-hidden="true" /></Link></Button>
          {whatsappNumber && <a className="px-2 py-3 text-sm font-semibold text-clinic-blue" href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">WhatsApp the clinic</a>}
        </nav>}
      </header>
      <main>{children}</main>
      <footer className="border-t border-border bg-secondary/40">
        <div className="clinic-container grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:py-16">
          <div className="max-w-sm">
            <ClinicWordmark />
            <p className="mt-5 text-sm leading-6 text-muted-foreground">Root canal care in Shirpur, with clear guidance and thoughtful attention to each patient.</p>
            <p className="mt-4 text-xs text-muted-foreground">Clinic contact details to be confirmed before publication.</p>
          </div>
          <div>
            <h2 className="text-sm font-bold text-clinic-navy">Explore</h2>
            <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
              <li><Link to="/treatments" className="hover:text-clinic-blue">Treatments</Link></li>
              <li><Link to="/root-canal" className="hover:text-clinic-blue">Root canal care</Link></li>
              <li><Link to="/about" className="hover:text-clinic-blue">About the clinic</Link></li>
              <li><Link to="/faq" className="hover:text-clinic-blue">Patient FAQs</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-bold text-clinic-navy">Get in touch</h2>
            <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
              <li>Shirpur, Maharashtra, India</li>
              <li>{clinicConfig.phone ? <a href={`tel:${clinicConfig.phone}`} className="hover:text-clinic-blue">{clinicConfig.phone}</a> : "Phone number to be confirmed"}</li>
              <li><Link to="/contact" className="inline-flex items-center gap-1 hover:text-clinic-blue">Contact details <ArrowUpRight size={14} /></Link></li>
              {whatsappNumber && <li><a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="hover:text-clinic-blue">WhatsApp</a></li>}
            </ul>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="clinic-container flex flex-col gap-3 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} Sanghari Dental Clinic</span>
            <Link to="/privacy" className="hover:text-clinic-blue">Privacy policy</Link>
          </div>
        </div>
      </footer>
      {phoneNumber && <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2 border-t border-border bg-background p-3 shadow-lg md:hidden">
        <Button asChild variant="outline"><a href={`tel:+${phoneNumber}`}><Phone aria-hidden="true" /> Call</a></Button>
        <Button asChild><Link to="/book">Book</Link></Button>
      </div>}
    </div>
  );
}