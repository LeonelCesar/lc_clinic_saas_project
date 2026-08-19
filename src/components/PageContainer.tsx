import type {
  PropsWithChildren,
  ReactNode,
} from "react";

interface PageContainerProps
  extends PropsWithChildren {
  title: string;
  description: string;
  action?: ReactNode;
}

export default function PageContainer({
  title,
  description,
  action,
  children,
}: PageContainerProps) {
  return (
    <section>
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {title}
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>
        </div>

        {action}
      </header>

      {children}
    </section>
  );
}