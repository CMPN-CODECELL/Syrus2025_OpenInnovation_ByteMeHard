import SpotlightCard from "./SpotlightCard";

const plans = [
  {
    title: "Nirman Lite - $19/month",
    features: ["Basic financial tracking", "Expense categorization", "Limited reports"],
  },
  {
    title: "Nirman Pro - $49/quarter",
    features: ["All Free Plan features", "Advanced analytics & insights", "Real-time transaction monitoring"],
  },
  {
    title: "Nirman Gati - $90/yearly",
    features: ["All Pro Plan features", "Custom financial dashboards", "API access & team collaboration"],
  },
];

const SubscriptionSection = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <SpotlightCard key={plan.title} title={plan.title} features={plan.features} />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionSection;
