import { HeroSection } from '@/components/hero-section';
import { Button } from '@/components/ui/button';
import { Pump } from 'basehub/react-pump';
import { draftMode } from 'next/headers';
import Link from 'next/link';

export const Hero = async () => {
  const { isEnabled } = await draftMode();

  return (
    <Pump
      queries={[
        {
          __typename: true,
          live: {
            _title: true,
            hero: {
              text: true,
            },
          },
        },
      ]}
      draft={isEnabled}
    >
      {/* biome-ignore lint/suspicious/useAwait: Server Actions must be async */}
      {async ([data]) => {
        'use server';

        return (
          <HeroSection caption={data.live._title} title={data.live.hero.text}>
            <Button asChild variant="outline">
              <Link href="/contact?type=event">Contact me about an event</Link>
            </Button>
          </HeroSection>
        );
      }}
    </Pump>
  );
};
