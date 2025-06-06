import top1 from "./images/top1.jpg";
import top2 from "./images/top2.jpg";
import top3 from "./images/top3.jpg";

const images = [top1, top2, top3];

const TopScores = ({ topScores }: any) => {
  console.log(topScores);

  return (
    <>
      <h3 className="text-center font-semibold mb-2">
        Top Scores In This Category
      </h3>

      <div className={"flex w-full justify-center max-h-100 gap-5"}>
        {topScores.map((score: any, i: any) => (
          <div
            className="text-center bg-gray-100 p-1 rounded-md max-h-90"
            key={i}>
            <img src={images[i]} alt="img" className="max-h-50" />
            <p className="font-bold">
              {i + 1}. {score.name}
            </p>
            <p className="bg-gray-200 rounded-md">{score.bestTime}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default TopScores;
