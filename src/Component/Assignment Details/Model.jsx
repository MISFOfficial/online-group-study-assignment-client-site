import React, { useState, useEffect, use } from 'react';
import { AuthContext } from '../../Auth/AuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const Model = ({ assignmentDataId }) => {
    const { theme, user } = use(AuthContext);
    const { title, marks, thumbnail, difficulty, date, _id } = assignmentDataId;

    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [alreadySubmitted, setAlreadySubmitted] = useState(false);

    const navigate = useNavigate()

    // console.log(user.displayName)

    //  Check from backend if user already submitted
    useEffect(() => {
        if (!user?.email || !_id) return;
        fetch(`https://group-study-platform-backend.vercel.app/takeassignment/check?email=${user.email}&assignmentId=${_id}`)
            .then(res => {
                if (res.status === 200) {
                    setAlreadySubmitted(true);
                    setHasSubmitted(true);
                }
            });
    }, [user?.email, _id]);

    const validateForm = (data) => {
        const newErrors = {};
        const googleLinkPattern = /^https:\/\/docs\.google\.com\/.+$/;
        if (!googleLinkPattern.test(data.google_link)) {
            newErrors.google_link = "Please enter a valid Google Docs link.";
        }
        return newErrors;
    };

    const handleSubmitAssignment = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const submitAssignment = Object.fromEntries(formData.entries());

        const validationErrors = validateForm(submitAssignment);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Add more metadata to submission
        submitAssignment.email = user.email;
        submitAssignment.examnee_photo = user.photoURL;
        submitAssignment.examnee_name = user.displayName;
        submitAssignment.creator_user = assignmentDataId.user;
        submitAssignment.title = title;
        submitAssignment.assignmentId = _id;
        submitAssignment.target_marks = marks;
        submitAssignment.get_marks = 0;
        submitAssignment.thumbnail = thumbnail;
        submitAssignment.difficulty = difficulty;
        submitAssignment.last_date = date;
        submitAssignment.feadback = null;
        submitAssignment.pending = true;

        //  Add complete date
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const year = now.getFullYear();
        const month = now.toLocaleString('default', { month: 'short' });
        const hours = now.getHours() % 12 || 12;
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
        submitAssignment.complete_date = `${day} ${month} ${year} At ${hours}:${minutes} ${ampm}`;

        //  Don't allow submitting your own assignment
        if (user.email === assignmentDataId.user) {
            Swal.fire({
                icon: "warning",
                title: "You cannot submit your own assignment.",
                timer: 1500,
                showConfirmButton: false
            });
            return;
        }

        //  Submit to backend
        fetch('https://group-study-platform-backend.vercel.app/takeassignment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submitAssignment)
        })
            .then(res => {
                if (res.status === 409) {
                    throw new Error("Already submitted");
                }
                return res.json();
            })
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Assignment has been submitted!",
                    showConfirmButton: false,
                    timer: 1000
                });
                navigate('/assignment')
                setHasSubmitted(true);
                setAlreadySubmitted(true);
                setErrors({});
            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: error.message || "Submission failed!",
                    timer: 1500,
                    showConfirmButton: false
                });
            });
    };

    return (
        <div className='w-full flex items-center'>
            <button
                onClick={() => {
                    if (user.email === assignmentDataId.user) {
                        Swal.fire({
                            icon: "warning",
                            title: "You are the creator!",
                            text: "You cannot take your own assignment.",
                            timer: 2000,
                            showConfirmButton: false,
                        });
                    } else if (!alreadySubmitted) {
                        document.getElementById('my_modal_3').showModal();
                    }
                }}
                disabled={alreadySubmitted}
                className={` ${theme ? 'bg-green-800' : 'bg-purple-800'} mt-10 w-[700px] max-w-[95%] mx-auto rounded-[15px] text-white py-3 font-semibold ${alreadySubmitted ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
                {user.email === assignmentDataId.user
                    ? 'You are the creator'
                    : alreadySubmitted
                        ? 'Already Taken'
                        : 'Take Assignment'}
            </button>


            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div>
                        <h3 className="font-bold text-lg">Submit the assignment here...</h3>
                        <form onSubmit={handleSubmitAssignment} className='flex flex-col gap-2 mt-2'>
                            <input
                                className="border border-gray-400 rounded-md p-2 w-full"
                                type="text"
                                name='google_link'
                                placeholder="Google Doc Link"
                                required
                            />
                            {errors.google_link && <p className="text-red-500 text-sm">{errors.google_link}</p>}

                            <textarea
                                className='textarea-font border w-full h-30 rounded-md p-3 border-gray-400'
                                name="quick_note"
                                placeholder='Quick note'
                            />
                            {errors.quick_note && <p className="text-red-500 text-sm">{errors.quick_note}</p>}

                            <button
                                type='submit'
                                disabled={hasSubmitted}
                                className={`
                                    ${theme ? 'bg-green-800' : 'bg-purple-800'}
                                    mt-5 w-[700px] max-w-[100%] mx-auto rounded-[15px]
                                    text-white py-3 font-semibold
                                    ${hasSubmitted ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                                `}
                            >
                                {hasSubmitted ? 'Submitted' : 'Submit Assignment'}
                            </button>

                            <p className="py-4 text-center text-blue-500">Press ESC key or click on ✕ to close</p>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Model;
