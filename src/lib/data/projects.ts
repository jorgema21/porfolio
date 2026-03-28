export type ProjectType = 'hero' | 'mini' | 'full';

export interface Project {
	id: string;
	title: string;
	description?: string;
	image?: string;
	link?: string;
	type: ProjectType;
	priority?: number;
}

export const projects: Project[] = [
	{
		id: 'project-1',
		title: 'Proyecto Hero 1',
		type: 'hero',
		priority: 1
	}
];