"use client"

import { useState } from "react"
import { Star, ThumbsUp, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample reviews data
const reviewsData = [
  {
    id: "1",
    patientName: "John Smith",
    rating: 5,
    date: "2023-09-15",
    comment:
      "Dr. Johnson is an excellent cardiologist. She took the time to explain my condition in detail and answered all my questions. Her approach is very patient-centered and I felt well cared for during my visit.",
    helpful: 12,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    patientName: "Emily Davis",
    rating: 4,
    date: "2023-09-10",
    comment:
      "Very professional and knowledgeable doctor. The wait time was a bit long, but the quality of care was worth it. Would recommend to others with heart conditions.",
    helpful: 8,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    patientName: "Michael Brown",
    rating: 5,
    date: "2023-09-05",
    comment:
      "Dr. Johnson provided excellent care for my heart condition. She is thorough, compassionate, and explains everything clearly. The staff was also very friendly and helpful.",
    helpful: 15,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    patientName: "Sarah Wilson",
    rating: 4,
    date: "2023-08-28",
    comment:
      "Great experience overall. Dr. Johnson is very attentive and takes time to listen to concerns. The only reason for 4 stars instead of 5 is the clinic's parking situation, which can be challenging.",
    helpful: 6,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

interface DoctorReviewsProps {
  doctorId: string
}

export function DoctorReviews({ doctorId }: DoctorReviewsProps) {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  const handleSubmitReview = () => {
    // Logic to submit review
    console.log({ rating, comment })
    setShowReviewForm(false)
    setRating(0)
    setComment("")
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Patient Reviews</h3>
        <Button
          variant="outline"
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="flex items-center gap-2"
        >
          <MessageSquare className="h-4 w-4" />
          <span>Write a Review</span>
        </Button>
      </div>

      {showReviewForm && (
        <div className="rounded-lg border border-border/40 p-4 space-y-4">
          <h4 className="font-medium">Share Your Experience</h4>

          <div>
            <p className="mb-2 text-sm">Rating</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
                  <Star
                    className={`h-6 w-6 ${
                      rating >= star ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm">Your Review</p>
            <Textarea
              placeholder="Share your experience with this doctor..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowReviewForm(false)}>
              Cancel
            </Button>
            <Button
              className="bg-teal-600 hover:bg-teal-700"
              onClick={handleSubmitReview}
              disabled={rating === 0 || comment.trim() === ""}
            >
              Submit Review
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {reviewsData.map((review) => (
          <div key={review.id} className="border-b border-border/40 pb-6 last:border-0">
            <div className="flex justify-between mb-2">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={review.avatar} alt={review.patientName} />
                  <AvatarFallback>{review.patientName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{review.patientName}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(review.date)}</p>
                </div>
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-muted-foreground mb-3">{review.comment}</p>
            <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1">
              <ThumbsUp className="h-3 w-3" />
              <span>Helpful ({review.helpful})</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
