export type ProjectType = 'hero' | 'mini' | 'full';

export type ProjectSection =
	| 'hero-main'
	| 'hero-side'
	| 'hero-bottom'
	| 'full'
	| 'invert-side'
	| 'invert-main'
  | 'invert-bottom';

export interface ProjectTitle {
	es: string;
	en: string;
}

export interface Project {
	id: string;
	title: ProjectTitle;
	description?: ProjectTitle;
	image?: string;
	link?: string;
	type: ProjectType;
	section: ProjectSection;
	priority: number;
	tags?: string[];
	date?: string;
}

export const projects: Project[] = [
	// =========================
	// HERO PRINCIPAL
	// =========================
	{
		id: 'hero-1',
		title: {
			es: 'Proyecto destacado',
			en: 'Featured project'
		},
		description: {
			es: 'Proyecto principal de portada',
			en: 'Main featured project'
		},
		type: 'hero',
		section: 'hero-main',
		priority: 1,
		tags: ['editorial', 'd3']
	},

	// =========================
	// HERO SIDE (3 minis)
	// =========================
	{
		id: 'mini-1',
		title: { es: 'Mini proyecto 1', en: 'Mini project 1' },
		type: 'mini',
		section: 'hero-side',
		priority: 2
	},
	{
		id: 'mini-2',
		title: { es: 'Mini proyecto 2', en: 'Mini project 2' },
		type: 'mini',
		section: 'hero-side',
		priority: 3
	},
	{
		id: 'mini-3',
		title: { es: 'Mini proyecto 3', en: 'Mini project 3' },
		type: 'mini',
		section: 'hero-side',
		priority: 4
	},

	// =========================
	// HERO BOTTOM (3 minis)
	// =========================
	{
		id: 'mini-4',
		title: { es: 'Mini inferior 1', en: 'Bottom mini 1' },
		type: 'mini',
		section: 'hero-bottom',
		priority: 5
	},
	{
		id: 'mini-5',
		title: { es: 'Mini inferior 2', en: 'Bottom mini 2' },
		type: 'mini',
		section: 'hero-bottom',
		priority: 6
	},
	{
		id: 'mini-6',
		title: { es: 'Mini inferior 3', en: 'Bottom mini 3' },
		type: 'mini',
		section: 'hero-bottom',
		priority: 7
	},

	// =========================
	// FULL WIDTH PROJECTS
	// =========================
	{
		id: 'full-1',
		title: {
			es: 'Proyecto grande 1',
			en: 'Big project 1'
		},
		type: 'full',
		section: 'full',
		priority: 8
	},
	{
		id: 'full-2',
		title: {
			es: 'Proyecto grande 2',
			en: 'Big project 2'
		},
		type: 'full',
		section: 'full',
		priority: 9
	},

	// =========================
	// INVERTIDO (BOTTOM)
	// =========================
	{
		id: 'inv-1',
		title: { es: 'Mini invertido 1', en: 'Inverse mini 1' },
		type: 'mini',
		section: 'invert-side',
		priority: 10
	},
	{
		id: 'inv-2',
		title: { es: 'Mini invertido 2', en: 'Inverse mini 2' },
		type: 'mini',
		section: 'invert-side',
		priority: 11
	},
	{
		id: 'inv-3',
		title: { es: 'Mini invertido 3', en: 'Inverse mini 3' },
		type: 'mini',
		section: 'invert-side',
		priority: 12
	},
	{
		id: 'hero-2',
		title: {
			es: 'Proyecto final destacado',
			en: 'Final featured project'
		},
		type: 'hero',
		section: 'invert-main',
		priority: 13
	},
  {
	id: 'inv-b1',
	title: { es: 'Invert bottom 1', en: 'Invert bottom 1' },
	type: 'mini',
	section: 'invert-bottom',
	priority: 14
},
{
	id: 'inv-b2',
	title: { es: 'Invert bottom 2', en: 'Invert bottom 2' },
	type: 'mini',
	section: 'invert-bottom',
	priority: 15
},
{
	id: 'inv-b3',
	title: { es: 'Invert bottom 3', en: 'Invert bottom 3' },
	type: 'mini',
	section: 'invert-bottom',
	priority: 16
}
];