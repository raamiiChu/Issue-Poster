export type IssuePageParams = {
    params: { owner: string; repo: string };
};

export type IssueNumberPageParams = {
    params: { owner: string; repo: string; number: number };
};

export type Repo = {
    id: number;
    name: string;
    html_url: string;

    description: string;
    open_issues_count: number;

    owner: { login: string; html_url: string; avatar_url: string };

    created_at: string;
};

export type Issue = {
    id: number;
    number: number;
    html_url: string;

    title: string;
    body: string;

    comments: number;
    comments_url: string;

    author_association: string;
    user: { login: string; avatar_url: string; html_url: string };

    created_at: string;
};

export type Comment = {
    id: number;
    html_url: string;
    body: string;

    author_association: string;
    user: { login: string; avatar_url: string; html_url: string };

    created_at: string;
};
