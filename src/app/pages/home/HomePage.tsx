import { useEffect, useState } from "react";

import Card from "../../components/Card";
import useArticles from "../../hooks/useArticles";

const layout = {
  sm: [
    [
      {
        active: 100,
        default: 100,
      },
    ],
    [
      {
        active: 100,
        default: 100,
      },
    ],
    [
      {
        active: 100,
        default: 100,
      },
    ],
    [
      {
        active: 100,
        default: 100,
      },
    ],
  ],
  md: [
    [
      {
        active: 75,
        default: 60,
      },
      {
        active: 55,
        default: 40,
      },
    ],
    [
      {
        active: 55,
        default: 40,
      },
      {
        active: 75,
        default: 60,
      },
    ],
    [
      {
        active: 65,
        default: 50,
      },
      {
        active: 65,
        default: 50,
      },
    ],
    [
      {
        active: 55,
        default: 35,
      },
      {
        active: 80,
        default: 65,
      },
    ],
  ],
  lg: [
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
  ],
};

const getLayoutSize = (width: number) => {
  if (width >= 800) {
    return "md";
  } else if (width >= 1000) {
    return "lg";
  }

  return "sm";
};

const HomePage = () => {
  const { articles, isError, isLoading } = useArticles();
  const [currentRowIdx, setCurrentRowIdx] = useState<number | null>(null);
  const [currentColumnIdx, setCurrentColumnIdx] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  const updateContentWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateContentWidth);

    return () => {
      window.removeEventListener("resize", updateContentWidth);
    };
  }, []);

  const onCardMouseOver = (columnIdx: number, rowIdx: number) => {
    setCurrentRowIdx(rowIdx);
    setCurrentColumnIdx(columnIdx);
  };

  const onCardMouseOut = () => {
    setCurrentRowIdx(null);
    setCurrentColumnIdx(null);
  };

  const layoutSize = getLayoutSize(windowWidth);
  const currentLayout = layout[layoutSize];

  return (
    <div>
      {isError && <div>An error occurred :(</div>}
      {isLoading && <div>Loading...</div>}
      {!isLoading && !isError && (
        <div className="flex flex-col px-8 pb-8">
          {currentLayout.map((row, rowIdx) => {
            const firstArticle = articles[rowIdx * row.length];

            if (firstArticle) {
              return (
                <div
                  className="flex w-full overflow-hidden"
                  key={firstArticle.id}
                >
                  {row.map((column, columnIdx) => {
                    const article = articles[rowIdx * row.length + columnIdx];
                    if (article) {
                      const { description, id, publishedAt, title } = article;
                      let width = column.default;

                      if (
                        currentColumnIdx !== null &&
                        rowIdx === currentRowIdx
                      ) {
                        if (columnIdx === currentColumnIdx) {
                          width = column.active;
                        } else {
                          const activeColumn =
                            currentLayout[currentRowIdx][currentColumnIdx];

                          width =
                            (100 - activeColumn.active) / (row.length - 1);
                        }
                      }

                      const isCardActive =
                        layoutSize === "sm"
                          ? true
                          : rowIdx === currentRowIdx &&
                            columnIdx === currentColumnIdx;
                      const isRowActive =
                        layoutSize === "sm" ? true : rowIdx === currentRowIdx;

                      return (
                        <Card
                          date={publishedAt}
                          description={description}
                          height={isRowActive ? "340px" : "200px"}
                          isActive={isCardActive}
                          key={id}
                          onMouseOut={onCardMouseOut}
                          onMouseOver={() => onCardMouseOver(columnIdx, rowIdx)}
                          title={title}
                          to={`/article/${id}`}
                          width={`${width}%`}
                        />
                      );
                    }

                    return null;
                  })}
                </div>
              );
            }

            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default HomePage;
