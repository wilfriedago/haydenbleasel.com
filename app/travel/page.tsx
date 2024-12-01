import { basehub } from 'basehub';
import { Flighty } from './components/flighty';
import { Hero } from './components/hero';
import { Videos } from './components/videos';

export const generateMetadata = async () => {
  const { travel } = await basehub({ cache: 'no-store' }).query({
    travel: {
      metadata: {
        title: true,
        description: true,
      },
    },
  });

  return {
    title: travel.metadata.title,
    description: travel.metadata.description,
  };
};

const Travel = () => (
  <>
    <Hero />
    <Flighty />
    <Videos />
  </>
);

export default Travel;
