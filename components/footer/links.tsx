import { navigation } from '@/lib/navigation';
import { social } from '@/lib/social';
import { Pump } from 'basehub/react-pump';
import Image from 'next/image';
import Link from 'next/link';
import { ViewAnimation } from '../../providers/view-animation';
import { ActiveLink } from '../active-link';

export const Links = () => (
  <Pump
    queries={[
      {
        __typename: true,
        work: {
          roles: {
            items: {
              _title: true,
              _slug: true,
              startYear: true,
            },
          },
        },
        blog: {
          posts: {
            items: {
              _title: true,
              _slug: true,
              date: true,
            },
          },
        },
        projects: {
          apps: {
            items: {
              _title: true,
              _slug: true,
            },
          },
        },
        live: {
          features: {
            items: {
              _title: true,
              year: true,
              url: true,
            },
          },
          speaking: {
            items: {
              _title: true,
              year: true,
              url: true,
            },
          },
        },
      },
    ]}
  >
    {async ([data]) => {
      'use server';

      const lists: {
        title: string;
        href?: string;
        items: {
          href: string;
          children: string;
        }[];
      }[] = [
        {
          title: 'Pages',
          items: navigation.map((link) => ({
            href: link.href,
            children: link.label,
          })),
        },
        {
          title: 'Work',
          href: '/work',
          items: data.work.roles.items
            .sort((a, b) => b.startYear - a.startYear)
            .map((role) => ({
              href: `/work/${role._slug}`,
              children: role._title,
            })),
        },
        {
          title: 'Posts',
          href: '/blog',
          items: data.blog.posts.items
            .sort((a, b) => b.date.localeCompare(a.date))
            .slice(0, 5)
            .map((post) => ({
              href: `/blog/${post._slug}`,
              children: post._title,
            })),
        },
        {
          title: 'Projects',
          href: '/projects',
          items: data.projects.apps.items.slice(0, 7).map((app) => ({
            href: `/projects/${app._slug}`,
            children: app._title,
          })),
        },
        {
          title: 'Live',
          href: '/live',
          items: [...data.live.features.items, ...data.live.speaking.items]
            .filter((item) => item.url)
            .sort((a, b) => b.year - a.year)
            .slice(0, 5)
            .map((item) => ({
              href: item.url,
              children: item._title,
            })),
        },
        {
          title: 'Social',
          items: Object.values(social).map((link) => ({
            href: link.href,
            children: (
              <div className="flex items-center gap-2">
                <Image
                  src={link.icon}
                  alt={link.label}
                  width={14}
                  height={14}
                  className="h-3.5 w-3.5 opacity-50 brightness-0 dark:invert"
                />
                {link.label}
              </div>
            ),
          })),
        },
      ];

      return (
        <div className="grid grid-cols-6 gap-8 text-muted-foreground text-sm">
          {lists.map((list, index) => (
            <ViewAnimation
              initial={{ opacity: 0, translateY: -8 }}
              whileInView={{ opacity: 1, translateY: 0 }}
              delay={index * 0.1}
              key={list.title}
              className="flex flex-col gap-6"
            >
              <div className="font-medium text-foreground">
                {list.href ? (
                  <Link href={list.href}>{list.title}</Link>
                ) : (
                  <p>{list.title}</p>
                )}
              </div>
              <ul className="flex flex-col gap-3">
                {list.items.map((item) => (
                  <li key={item.href}>
                    <ActiveLink href={item.href}>{item.children}</ActiveLink>
                  </li>
                ))}
              </ul>
            </ViewAnimation>
          ))}
        </div>
      );
    }}
  </Pump>
);
