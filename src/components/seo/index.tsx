import Head from 'next/head';

type HeaderProps = {
    title: string;
    description: string;
    author?: string;
    keywords?: string[];
    ogImage: string;
};

export const propsMeta: HeaderProps = {
    title: 'Nu | Portfolio',
    description:
        'Panuwat Chaiwongthon is a talented fullstack developer with a passion for creating innovative and efficient software solutions. With years of experience as a backend developer, software developer, and software engineer, Panuwat is a skilled problem solver with the ability to design and implement complex systems. He is a NodeJS developer with expertise in building scalable and robust applications using the latest technologies and frameworks. As an Angular developer, Panuwat has a deep understanding of front-end development, including responsive design and web accessibility. With fluency in both Thai and English, Panuwat is a great communicator and collaborator who can work with cross-functional teams to deliver high-quality projects.',
    author: '',
    keywords: [
        'Panuwat Chaiwongthon',
        'Panuwat',
        'Chaiwongthon',
        'ภาณุวัฒน์ ไชยวงค์ทอน',
        'ภาณุวัฒน์',
        'ไชยวงค์ทอน',
        'Fullstack developer',
        'Backend developer',
        'Software developer',
        'Software engineer',
        'NodeJS developer',
        'NodeJS',
        'Angular developer',
        'Angular',
    ],
    ogImage: '',
};

export default function CrashBoyHead(props: HeaderProps) {
    return (
        <Head>
            <title>{props.title}</title>
            <meta name='description' content={props.description} />
            <meta name='keywords' content={props.keywords?.join(',')} />
            <meta name='author' content={props.author} />
            <meta name='robots' content='index, follow' />
            <meta
                name='viewport'
                content='width=device-width, initial-scale=1.0, user-scalable=no'
            />
            <link rel='icon' href='/favicon.svg' />

            {/* Open Graph Tags for Social Media */}
            <meta property='og:title' content={props.title} />
            <meta property='og:description' content={props.description} />
            <meta property='og:url' content='https://www.nuchaiwongthon.info' />
            <meta property='og:image' content={props.ogImage} />
            <meta property='og:type' content='website' />

            {/* Twitter Card Tags for Social Media */}
            <meta name='twitter:title' content={props.title} />
            <meta name='twitter:description' content={props.description} />
            <meta name='twitter:url' content='https://www.nuchaiwongthon.info' />
            <meta name='twitter:image' content={props.ogImage} />
            <meta name='twitter:card' content='summary_large_image' />
        </Head>
    );
}
