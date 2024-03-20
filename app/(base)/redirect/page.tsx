import RedirectClient from './page.uc';

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ searchParams }: Props) {
  return {
    title: `Переадресация на ${searchParams.to || '...'}`,
  };
}

export default async function Redirect() {
  return <RedirectClient />;
}
