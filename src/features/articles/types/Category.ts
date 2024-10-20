export interface Category {
  title: string;
  description: string;
  aboutDescription: string;
  icon: string;
  slug: {
    current: string;
  };
  tagColor: 'yellow' | 'blue' | 'green' | 'red' | 'purple' | null;
}
