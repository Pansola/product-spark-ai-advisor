
import ExpandableCard, { ExpandableCardProps } from "./ExpandableCard";

// Re-export the ExpandableCard with the same interface as AccordionCard
// for backwards compatibility
export type AccordionCardProps = ExpandableCardProps;

const AccordionCard = (props: AccordionCardProps) => {
  return <ExpandableCard {...props} />;
};

export default AccordionCard;
