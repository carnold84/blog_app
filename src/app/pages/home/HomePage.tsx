import classNames from "classnames";
import { useState } from "react";
import { Link } from "react-router-dom";

import useArticles from "../../hooks/useArticles";

const layout = [
  [
    {
      active: 66,
      default: 50,
    },
    {
      active: 50,
      default: 25,
    },
    {
      active: 50,
      default: 25,
    },
  ],
  [
    {
      active: 33,
      default: 25,
    },
    {
      active: 45,
      default: 37.5,
    },
    {
      active: 45,
      default: 37.5,
    },
  ],
  [
    {
      active: 50,
      default: 33,
    },
    {
      active: 50,
      default: 33,
    },
    {
      active: 50,
      default: 33,
    },
  ],
  [
    {
      active: 33,
      default: 25,
    },
    {
      active: 66,
      default: 50,
    },
    {
      active: 33,
      default: 25,
    },
  ],
];

const HomePage = () => {
  const { articles, isError, isLoading } = useArticles();
  const [currentRowIdx, setCurrentRowIdx] = useState<number | null>(null);
  const [currentColumnIdx, setCurrentColumnIdx] = useState<number | null>(null);

  /* const elements = useMemo(() => {
    if (articles) {
      const numRows = Math.ceil(articles.length / 4);
      const rows = []

      for (let i = 0; i < numRows; i++) {
        const article = 
        rows.push(<div>
          {articles}
        </div>)
      }

      return (
        <div></div>
      )
    }
  }, articles) */

  const onCardMouseOver = (columnIdx: number, rowIdx: number) => {
    setCurrentRowIdx(rowIdx);
    setCurrentColumnIdx(columnIdx);
  };

  const onCardMouseOut = () => {
    setCurrentRowIdx(null);
    setCurrentColumnIdx(null);
  };

  return (
    <div>
      {isError && <div>An error occurred :(</div>}
      {isLoading && <div>Loading...</div>}
      {!isLoading && !isError && (
        <div className="flex flex-wrap px-8 pb-8">
          {articles.map(({ description, id, publishedAt, title }, i) => {
            const rowIdx = Math.floor(i / 3);
            const columnIdx = i % 3;

            let width = layout[rowIdx][columnIdx].default;

            if (currentColumnIdx !== null && rowIdx === currentRowIdx) {
              if (columnIdx === currentColumnIdx) {
                width = layout[rowIdx][columnIdx].active;
              } else {
                const activeColumn = layout[currentRowIdx][currentColumnIdx];

                width = (100 - activeColumn.active) / 2;
              }
            }

            return (
              <div
                className={classNames(
                  "flex h-52 cursor-pointer flex-col justify-end gap-2 overflow-hidden p-3 transition-all duration-500",
                  {
                    "h-48": rowIdx !== currentRowIdx,
                    "h-64": rowIdx === currentRowIdx,
                  }
                )}
                key={id}
                style={{ width: `${width}%` }}
              >
                <Link
                  className="group relative h-full w-full overflow-hidden border border-solid border-neutral-100 bg-neutral-50"
                  onMouseOver={() => onCardMouseOver(columnIdx, rowIdx)}
                  onMouseOut={onCardMouseOut}
                  to={`/article/${id}`}
                >
                  <h2
                    className={classNames(
                      "absolute left-10 top-10 origin-top-left text-text-200 transition-all duration-500 group-hover:text-text-500",
                      {
                        "text-xl":
                          rowIdx !== currentRowIdx ||
                          columnIdx !== currentColumnIdx,
                        "text-2xl":
                          rowIdx === currentRowIdx &&
                          columnIdx === currentColumnIdx,
                      }
                    )}
                  >
                    {title}
                  </h2>
                  <p
                    className={classNames(
                      "absolute left-10 top-20 origin-top-left text-base text-text-100 transition-all delay-100 duration-500",
                      {
                        "text-base":
                          rowIdx !== currentRowIdx ||
                          columnIdx !== currentColumnIdx,
                        "text-2xl":
                          rowIdx === currentRowIdx &&
                          columnIdx === currentColumnIdx,
                      }
                    )}
                  >
                    {description}
                  </p>
                  <p
                    className={classNames(
                      "absolute left-10 origin-top-left text-lg text-neutral-200 transition-all delay-100 duration-500 group-hover:text-text-500",
                      {
                        "-bottom-10 opacity-0":
                          rowIdx !== currentRowIdx ||
                          columnIdx !== currentColumnIdx,
                        "bottom-10 opacity-100":
                          rowIdx === currentRowIdx &&
                          columnIdx === currentColumnIdx,
                      }
                    )}
                  >
                    {Intl.DateTimeFormat(undefined, {
                      dateStyle: "full",
                    }).format(new Date(publishedAt))}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HomePage;
