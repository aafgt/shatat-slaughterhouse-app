interface MetricCardProps {
  title: string;
  value: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value }) => {
  return (
    <div className="bg-white text-black rounded-lg shadow-lg p-5">
      <h3 className="font-bold text-2xl">{title}</h3>
      <p className="text-green-500 font-extrabold text-3xl">{value}</p>
    </div>
  );
};

export default MetricCard;