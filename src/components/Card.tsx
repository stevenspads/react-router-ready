import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export function Card({ children }: Props) {
  return <div className="border rounded-lg p-3 space-y-4 shadow-lg">{children}</div>;
}

export function CardImage({ children }: Props) {
  return <div className="relative aspect-square">{children}</div>;
}

export function CardContent({ children }: Props) {
  return <div className="space-y-2">{children}</div>;
}

export function CardTitle({ children }: Props) {
  return <h3 className="text-lg font-medium">{children}</h3>;
}

export function CardDescription({ children }: Props) {
  return <p className="text-sm text-gray-600">{children}</p>;
}
