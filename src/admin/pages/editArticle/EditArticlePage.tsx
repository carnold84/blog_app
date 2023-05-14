import { ChangeEvent, lazy, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import rehypeSanitize from "rehype-sanitize";

import Loading from "../../../shared/component/Loading";
import useArticle from "../../../shared/hooks/useArticle";
import toSentenceCase from "../../../shared/utils/toSentenceCase";

const MDEditor = lazy(() => import("@uiw/react-md-editor"));

interface FormErrors {
  body: string;
  published: string;
  title: string;
}

const EditArticlePage = () => {
  const { id } = useParams();
  const { article, isError, isLoading } = useArticle(id);
  const { created, status, title, updated } = article;
  const [formData, setFormData] = useState({
    body: "",
    published: "",
    title: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    body: "",
    published: "",
    title: "",
  });

  useEffect(() => {
    if (article) {
      setFormData({
        body: article.body,
        published: Intl.DateTimeFormat().format(new Date(article.published)),
        title: article.title,
      });
    }
  }, [article]);

  const onTitleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return {
        ...prev,
        title: evt.target.value ?? "",
      };
    });
  };

  const onBodyChange = (value: string | undefined) => {
    setFormData((prev) => {
      return {
        ...prev,
        body: value ?? "",
      };
    });
  };

  const onPublishedChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return {
        ...prev,
        published: evt.target.value ?? "",
      };
    });
  };

  const onSave = () => {
    const nextFormErrors: FormErrors = {
      body: "",
      published: "",
      title: "",
    };

    for (const key in formData) {
      if (formData[key as keyof typeof formData] === "") {
        nextFormErrors[key as keyof typeof formData] =
          "Please fill in this field.";
      }
    }

    setFormErrors(nextFormErrors);
  };

  return (
    <div className="flex h-full flex-col">
      {isError && <div>An error occurred :(</div>}
      {isLoading && <Loading />}
      {!isLoading && !isError && (
        <>
          <div className="mb-3 flex gap-2">
            <Link className="font-sans text-xl text-slate-500" to="/admin">
              Articles
            </Link>
            <p className="font-sans text-xl">&gt;</p>
            <h2 className="font-sans text-xl text-slate-500">
              Edit <strong className="text-slate-900">{title}</strong>
            </h2>
          </div>
          <div className="flex w-full grow gap-5">
            <div className="relative flex h-full grow flex-col">
              <div className="text_field is_large mb-3">
                <input onChange={onTitleChange} value={formData.title} />
              </div>
              <div className="relative grow" data-color-mode="light">
                <MDEditor
                  height={"100%"}
                  onChange={onBodyChange}
                  previewOptions={{
                    rehypePlugins: [[rehypeSanitize]],
                  }}
                  style={{
                    height: "100%",
                    position: "absolute",
                    width: "100%",
                  }}
                  value={formData.body}
                />
              </div>
            </div>
            <div className="flex w-64 flex-col gap-3">
              <p className="font-sans text-base text-slate-500">
                Status:{" "}
                <span className="text-slate-800">{toSentenceCase(status)}</span>
              </p>
              <p className="font-sans text-base text-slate-500">
                Created:{" "}
                <span className="text-slate-800">
                  {Intl.DateTimeFormat().format(new Date(created))}
                </span>
              </p>
              <p className="font-sans text-base text-slate-500">
                Updated:{" "}
                <span className="text-slate-800">
                  {Intl.DateTimeFormat().format(new Date(updated))}
                </span>
              </p>

              <div className="text_field">
                <label htmlFor="publish_date">Publish Date</label>
                <input
                  id="publish_date"
                  onChange={onPublishedChange}
                  value={formData.published}
                />
              </div>
              <div className="flex gap-2">
                <button className="btn btn_primary" onClick={onSave}>
                  Save
                </button>
                <button className="btn">Publish</button>
              </div>
              <div>{JSON.stringify(formErrors)}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EditArticlePage;
