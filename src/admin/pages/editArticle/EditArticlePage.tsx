import classNames from "classnames";
import { ChangeEvent, lazy, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import rehypeSanitize from "rehype-sanitize";

import Loading from "../../../shared/components/Loading";
import toSentenceCase from "../../../shared/utils/toSentenceCase";
import useArticle from "../../hooks/useArticle";

const MDEditor = lazy(() => import("@uiw/react-md-editor"));

interface FormErrors {
  content: boolean;
  publishDate: boolean;
  title: boolean;
}

const EditArticlePage = () => {
  const { id } = useParams();
  const { article, isError, isLoading } = useArticle(id);
  const { createdAt, status, title, updatedAt } = article;
  const [formData, setFormData] = useState({
    content: "",
    publishDate: "",
    title: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    content: false,
    publishDate: false,
    title: false,
  });

  useEffect(() => {
    if (article) {
      console.log;
      setFormData({
        content: article.content,
        publishDate: Intl.DateTimeFormat().format(
          new Date(article.publishedAt)
        ),
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

  const onContentChange = (value: string | undefined) => {
    setFormData((prev) => {
      return {
        ...prev,
        content: value ?? "",
      };
    });
  };

  const onPublishedChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return {
        ...prev,
        publishDate: evt.target.value ?? "",
      };
    });
  };

  const onSave = () => {
    const nextFormErrors = {
      content: false,
      publishDate: false,
      title: false,
    };

    if (formData.content === "") {
      nextFormErrors.content = true;
    }

    if (formData.publishDate === "") {
      nextFormErrors.publishDate = true;
    }

    if (formData.title === "") {
      nextFormErrors.title = true;
    }

    setFormErrors(nextFormErrors);
  };

  return (
    <div className="flex h-full flex-col">
      {isError && <div>An error occurred :(</div>}
      {isLoading && <Loading />}
      {!isLoading && !isError && (
        <>
          <div className="mb-5 flex items-center gap-2">
            <Link
              className="p-1 font-sans text-xl text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800"
              to="/admin"
            >
              <svg
                width="18px"
                height="18px"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="currentcolor"
              >
                <path
                  d="M21 12H3m0 0l8.5-8.5M3 12l8.5 8.5"
                  stroke="currentcolor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </Link>
            <h2 className="font-sans text-xl text-neutral-500">
              Edit <strong className="text-neutral-900">{title}</strong>
            </h2>
          </div>
          <div className="flex w-full grow gap-10">
            <div className="relative flex h-full grow flex-col gap-5">
              <div className="text_field is_large">
                <input
                  className={classNames({
                    is_error: formErrors.title === true,
                  })}
                  id="title"
                  onChange={onTitleChange}
                  value={formData.title}
                />
              </div>
              <div className="flex grow flex-col">
                <div className="relative grow" data-color-mode="light">
                  <MDEditor
                    className={classNames({
                      is_error: formErrors.content === true,
                    })}
                    height={"100%"}
                    id="content"
                    onChange={onContentChange}
                    previewOptions={{
                      rehypePlugins: [[rehypeSanitize]],
                    }}
                    style={{
                      height: "100%",
                      position: "absolute",
                      width: "100%",
                    }}
                    value={formData.content}
                  />
                </div>
              </div>
            </div>
            <div className="flex w-64 flex-col gap-5">
              <p className="font-sans text-base text-neutral-500">
                Status:{" "}
                <span className="text-neutral-800">
                  {toSentenceCase(status)}
                </span>
              </p>
              <p className="font-sans text-base text-neutral-500">
                Created:{" "}
                <span className="text-neutral-800">
                  {Intl.DateTimeFormat().format(new Date(createdAt))}
                </span>
              </p>
              <p className="font-sans text-base text-neutral-500">
                Updated:{" "}
                <span className="text-neutral-800">
                  {Intl.DateTimeFormat().format(new Date(updatedAt))}
                </span>
              </p>

              <div className="text_field">
                <label htmlFor="publish_date">Publish Date</label>
                <input
                  className={classNames({
                    is_error: formErrors.publishDate === true,
                  })}
                  id="publish_date"
                  onChange={onPublishedChange}
                  value={formData.publishDate}
                />
              </div>
              <div className="flex gap-2">
                <button className="btn btn_primary" onClick={onSave}>
                  Save
                </button>
                <button className="btn">Publish</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EditArticlePage;
