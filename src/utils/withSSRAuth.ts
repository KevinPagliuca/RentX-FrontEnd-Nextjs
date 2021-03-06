import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';

import { destroyCookie, parseCookies } from 'nookies';

export function withSSRAuth<P>(fn: GetServerSideProps<P>): GetServerSideProps {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const { '@rentX:token': token } = parseCookies(ctx);

    if (!token) {
      destroyCookie(ctx, '@rentX:token');
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    try {
      return await fn(ctx);
    } catch (err) {
      destroyCookie(ctx, '@rentX:token');
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  };
}
