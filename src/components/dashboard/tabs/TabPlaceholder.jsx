import React from "react";

const TabPlaceholder = ({ title, text }) => {
  return (
    <section className="rounded-2xl border border-[#E2E8F0] bg-white p-8">
      <h2 className="text-2xl font-semibold text-(--primary-color)">{title}</h2>
      <p className="mt-3 text-(--subtext-color)">{text}</p>
    </section>
  );
};

export default TabPlaceholder;
