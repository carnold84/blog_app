import { useNavigate } from "react-router-dom";

import useArticles from "../../hooks/useArticles";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { articles, isError, isLoading } = useArticles();

  const onRowClick = (id: string) => {
    navigate(`/admin/article/${id}`);
  };

  return (
    <div>
      <h2 className="mb-5 font-sans text-xl">Articles</h2>
      {isError && <div>An error occurred :(</div>}
      {isLoading && <div>Loading...</div>}
      {!isLoading && !isError && (
        <table className="table w-full">
          <thead>
            <tr>
              <td>Title</td>
              <td>Created</td>
              <td>Published</td>
              <td width={40}></td>
            </tr>
          </thead>
          <tbody>
            {articles.map(({ createdAt, id, publishedAt, title }) => {
              return (
                <tr
                  className="cursor-pointer"
                  key={id}
                  onClick={() => onRowClick(id)}
                >
                  <td className="font-bold">{title}</td>
                  <td>{Intl.DateTimeFormat().format(new Date(createdAt))}</td>
                  <td>{Intl.DateTimeFormat().format(new Date(publishedAt))}</td>
                  <td width={40}>
                    <div className="btn btn_text">Edit</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DashboardPage;
