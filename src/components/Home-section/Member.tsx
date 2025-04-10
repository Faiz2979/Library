import { Award, CheckCircle, Link } from "lucide-react";


export default function Member() {
    return (
        <div className="bg-gradient-to-r from-sky-900/30 to-indigo-900/30 backdrop-blur-md border border-gray-800 rounded-xl shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 p-8 md:p-12">
                    <span className="inline-block px-3 py-1 text-xs font-semibold bg-sky-900/50 text-sky-400 rounded-full mb-4">
                        Premium Access
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Become a Premium Member</h3>
                    <p className="text-gray-300 mb-6">
                        Upgrade to premium membership for exclusive borrowing benefits and priority access to new releases.
                    </p>

                    <ul className="space-y-3 mb-8">
                        {[
                            "Borrow up to 10 books simultaneously",
                            "Extended borrowing periods up to 45 days",
                            "Free home delivery and pickup",
                            "Priority reservations for new releases",
                            "Access to exclusive digital content",
                        ].map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-sky-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-300">{benefit}</span>
                            </li>
                        ))}
                    </ul>

                    <Link
                        href="/membership/premium"
                        className="bg-sky-600 hover:bg-sky-700 text-white py-3 px-8 rounded-md transition-colors duration-200 font-medium inline-block"
                    >
                        Upgrade Now
                    </Link>
                </div>

                <div className="w-full md:w-1/2 bg-gradient-to-br from-sky-900/40 to-indigo-900/40 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=400')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>

                    {/* Decorative elements */}
                    <div className="absolute top-1/3 right-1/3 w-20 h-20 rounded-full bg-sky-500/10 backdrop-blur-md animate-pulse"></div>
                    <div className="absolute bottom-1/4 left-1/4 w-16 h-16 rounded-full bg-indigo-500/10 backdrop-blur-md animate-pulse delay-1000"></div>

                    {/* Testimonial */}
                    <div className="absolute bottom-8 left-8 right-8">
                        <div className="bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-lg p-6">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="w-12 h-12 rounded-full bg-sky-900/50 flex items-center justify-center">
                                    <Award className="h-6 w-6 text-sky-400" />
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold">Sarah Johnson</h4>
                                    <p className="text-gray-400 text-sm">Premium Member</p>
                                </div>
                            </div>
                            <p className="text-gray-300 italic">
                                "The premium membership has completely transformed my reading experience. I love the extended
                                borrowing periods and home delivery service!"
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}