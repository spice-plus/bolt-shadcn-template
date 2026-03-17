type PageTitleProps = {
  title: string;
};

export function PageTitle({ title }: PageTitleProps) {
  return (
    <h1 className="text-2xl font-bold tracking-tight text-foreground">
      {title}
    </h1>
  );
}
