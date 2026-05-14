import FloatingCart from '@/components/shop/FloatingCart';

export default function DelverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FloatingCart />
      {children}
    </>
  );
}
