export interface IssuePageParams {
    details: [string, string];
}

export interface Repo {
    id: number;
    name: string;
    owner: { login: string; html_url: string; avatar_url: string };
    html_url: string;
    description: string;
    created_at: string;
}

export interface Issue {
    id: number;
    number: number;
    html_url: string;

    title: string;
    body: string;

    comments: number;
    comments_url: string;
}
