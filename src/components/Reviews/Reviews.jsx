import { motion } from "framer-motion";
import "./Reviews.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddReview } from "../../store/reviewSlice";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { FaStar, FaRegStar } from "react-icons/fa";

function Reviews() {
  const dispatch = useDispatch();
  const allreviews = useSelector((state) => state.review.review);

  console.log("All Reviews from Redux Store:", allreviews);

  useEffect(() => {
    async function getReviews() {
      try {
        const res = await axios.get(`${BASE_URL}/allreviews`, {
          withCredentials: true,
        });
        const payload = res?.data?.data ?? res?.data ?? null;
        if (payload) {
          dispatch(AddReview(payload));
        }
      } catch (err) {
        console.error(
          "Error fetching reviews:",
          err.response?.data || err.message
        );
      }
    }
    getReviews();
  }, []);

  const renderStars = (rating) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} color="#eec84d" />);
      } else {
        stars.push(<FaRegStar key={i} color="#eec84d" />);
      }
    }

    return stars;
  };

  return (
    <>
      {allreviews.length > 0 && (
        <div className="review-section">
          <h2>What our customers says</h2>
          <div className="marquee-wrapper">
            <motion.div
              className="marquee-row"
            /*  animate={{ x: ["-100%", "100%"] }} */
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {allreviews.map((review, index) => (
               <div className="review-box" key={review._id}>
                  {review.images?.[0] && (
                    <img src={`${BASE_URL}${review.images[0]}`} alt="review" />
                  )}

                  <div className="review-box-info">
                    <div className="review-header">
                      <h5>{review.userId.firstName || "Anonymous"}</h5>
                      <div className="review-stars">
                        {renderStars(review.rating)}
                      </div>
                    </div>

                    <p>{review.comment}</p>
                  </div>
                </div>
               
              ))}
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
}
export default Reviews;
