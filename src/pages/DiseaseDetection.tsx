// // // import { Sidebar } from '@/components/Sidebar';
// // // import { Card } from '@/components/ui/card';
// // // import { Button } from '@/components/ui/button';
// // // import { Input } from '@/components/ui/input';
// // // import { Label } from '@/components/ui/label';
// // // import { Upload, AlertCircle, Leaf } from 'lucide-react';
// // // import { useState } from 'react';
// // // import { supabase } from '@/integrations/supabase/client';
// // // import { toast } from 'sonner';
// // // import { useLanguage } from '@/contexts/LanguageContext';

// // // export default function DiseaseDetection() {
// // //   const { t } = useLanguage();
// // //   const [cropName, setCropName] = useState('');
// // //   const [image, setImage] = useState<File | null>(null);
// // //   const [imagePreview, setImagePreview] = useState<string>('');
// // //   const [result, setResult] = useState<any>(null);
// // //   const [loading, setLoading] = useState(false);

// // //   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     const file = e.target.files?.[0];
// // //     if (file) {
// // //       setImage(file);
// // //       const reader = new FileReader();
// // //       reader.onloadend = () => {
// // //         setImagePreview(reader.result as string);
// // //       };
// // //       reader.readAsDataURL(file);
// // //     }
// // //   };

// // //   const parseAnalysisResult = (diagnosis: string) => {
// // //     const sections: any = {
// // //       disease: '',
// // //       severity: '',
// // //       symptoms: '',
// // //       treatment: '',
// // //       preventive: '',
// // //       pesticides: ''
// // //     };

// // //     const lines = diagnosis.split('\n');
// // //     let currentSection = '';

// // //     lines.forEach(line => {
// // //       const lower = line.toLowerCase();
// // //       if (lower.includes('disease name') || lower.includes('diagnosis')) {
// // //         currentSection = 'disease';
// // //       } else if (lower.includes('severity')) {
// // //         currentSection = 'severity';
// // //       } else if (lower.includes('symptom')) {
// // //         currentSection = 'symptoms';
// // //       } else if (lower.includes('treatment') || lower.includes('cure')) {
// // //         currentSection = 'treatment';
// // //       } else if (lower.includes('preventive') || lower.includes('prevention')) {
// // //         currentSection = 'preventive';
// // //       } else if (lower.includes('pesticide') || lower.includes('solution')) {
// // //         currentSection = 'pesticides';
// // //       } else if (line.trim() && currentSection) {
// // //         sections[currentSection] += line.trim() + ' ';
// // //       }
// // //     });

// // //     if (!sections.disease) {
// // //       sections.disease = diagnosis.split('\n')[0];
// // //       sections.treatment = diagnosis;
// // //     }

// // //     return sections;
// // //   };

// // //   const handleAnalyze = async () => {
// // //     if (!cropName || !image) {
// // //       toast.error(t('pleaseFillAllFields'));
// // //       return;
// // //     }

// // //     setLoading(true);
// // //     try {
// // //       const reader = new FileReader();
// // //       reader.onloadend = async () => {
// // //         const base64Image = reader.result as string;
// // //         const { data, error } = await supabase.functions.invoke('disease-detection', {
// // //           body: {
// // //             cropName,
// // //             image: base64Image,
// // //           },
// // //         });

// // //         if (error) {
// // //           toast.error(t('analysisFailed'));
// // //         } else {
// // //           setResult(data);
// // //           toast.success(t('analysisComplete'));
// // //         }
// // //         setLoading(false);
// // //       };
// // //       reader.readAsDataURL(image);
// // //     } catch (error) {
// // //       toast.error(t('errorOccurred'));
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="flex min-h-screen">
// // //       <Sidebar />
// // //       <main className="flex-1 p-8">
// // //         <div className="mb-6">
// // //           <h1 className="text-3xl font-bold">{t('diseaseDetection')}</h1>
// // //           <p className="text-muted-foreground">{t('diseaseDetectionDesc')}</p>
// // //         </div>

// // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // //           <Card className="p-6">
// // //             <h2 className="text-lg font-semibold mb-4">{t('uploadCropImage')}</h2>

// // //             <div className="space-y-4">
// // //               <div>
// // //                 <Label htmlFor="cropName">{t('cropName')}</Label>
// // //                 <Input
// // //                   id="cropName"
// // //                   placeholder={t('cropNamePlaceholder')}
// // //                   value={cropName}
// // //                   onChange={(e) => setCropName(e.target.value)}
// // //                 />
// // //               </div>

// // //               <div>
// // //                 <Label>{t('cropImage')}</Label>
// // //                 <div
// // //                   className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
// // //                   onClick={() => document.getElementById('imageUpload')?.click()}
// // //                 >
// // //                   {imagePreview ? (
// // //                     <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded" />
// // //                   ) : (
// // //                     <>
// // //                       <Upload className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
// // //                       <p className="text-sm font-medium">{t('clickToUpload')}</p>
// // //                       <p className="text-xs text-muted-foreground mt-1">{t('imageFormat')}</p>
// // //                     </>
// // //                   )}
// // //                 </div>
// // //                 <input
// // //                   id="imageUpload"
// // //                   type="file"
// // //                   accept="image/*"
// // //                   className="hidden"
// // //                   onChange={handleImageChange}
// // //                 />
// // //               </div>

// // //               <Button onClick={handleAnalyze} disabled={loading} className="w-full">
// // //                 {loading ? t('analyzing') : t('detectDisease')}
// // //               </Button>
// // //             </div>
// // //           </Card>

// // //           {result ? (
// // //             <>
// // //               <Card className="p-6">
// // //                 <div className="flex items-center gap-2 mb-4">
// // //                   <AlertCircle className="w-5 h-5 text-destructive" />
// // //                   <h2 className="text-lg font-semibold">{t('diseaseDetails')}</h2>
// // //                 </div>
// // //                 {(() => {
// // //                   const parsed = parseAnalysisResult(result.diagnosis);
// // //                   return (
// // //                     <div className="space-y-4">
// // //                       {parsed.disease && (
// // //                         <div>
// // //                           <h3 className="font-medium text-sm text-muted-foreground mb-1">{t('diseaseName')}</h3>
// // //                           <p className="text-sm">{parsed.disease}</p>
// // //                         </div>
// // //                       )}
// // //                       {parsed.severity && (
// // //                         <div>
// // //                           <h3 className="font-medium text-sm text-muted-foreground mb-1">{t('severity')}</h3>
// // //                           <p className="text-sm">{parsed.severity}</p>
// // //                         </div>
// // //                       )}
// // //                       {parsed.symptoms && (
// // //                         <div>
// // //                           <h3 className="font-medium text-sm text-muted-foreground mb-1">{t('symptoms')}</h3>
// // //                           <p className="text-sm">{parsed.symptoms}</p>
// // //                         </div>
// // //                       )}
// // //                     </div>
// // //                   );
// // //                 })()}
// // //               </Card>

// // //               <Card className="p-6">
// // //                 <div className="flex items-center gap-2 mb-4">
// // //                   <Leaf className="w-5 h-5 text-primary" />
// // //                   <h2 className="text-lg font-semibold">{t('treatmentRecommendations')}</h2>
// // //                 </div>
// // //                 {(() => {
// // //                   const parsed = parseAnalysisResult(result.diagnosis);
// // //                   return (
// // //                     <div className="space-y-4">
// // //                       {parsed.treatment && (
// // //                         <div>
// // //                           <h3 className="font-medium text-sm text-muted-foreground mb-1">{t('treatment')}</h3>
// // //                           <p className="text-sm">{parsed.treatment}</p>
// // //                         </div>
// // //                       )}
// // //                       {parsed.pesticides && (
// // //                         <div>
// // //                           <h3 className="font-medium text-sm text-muted-foreground mb-1">{t('pesticides')}</h3>
// // //                           <p className="text-sm">{parsed.pesticides}</p>
// // //                         </div>
// // //                       )}
// // //                       {parsed.preventive && (
// // //                         <div>
// // //                           <h3 className="font-medium text-sm text-muted-foreground mb-1">{t('preventiveMeasures')}</h3>
// // //                           <p className="text-sm">{parsed.preventive}</p>
// // //                         </div>
// // //                       )}
// // //                     </div>
// // //                   );
// // //                 })()}
// // //               </Card>
// // //             </>
// // //           ) : (
// // //             <Card className="p-6 flex items-center justify-center">
// // //               <div className="text-center py-8">
// // //                 <AlertCircle className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
// // //                 <p className="text-sm text-muted-foreground">{t('uploadImageToAnalyze')}</p>
// // //               </div>
// // //             </Card>
// // //           )}
// // //         </div>
// // //       </main>
// // //     </div>
// // //   );
// // // }
// // import { Sidebar } from '@/components/Sidebar';
// // import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Label } from '@/components/ui/label';
// // import { Upload, AlertCircle, Leaf, Shield, Stethoscope } from 'lucide-react';
// // import { useState } from 'react';
// // import axios from 'axios';
// // import { toast } from 'sonner';
// // import { useLanguage } from '@/contexts/LanguageContext';

// // export default function DiseaseDetection() {
// //   const { t } = useLanguage();
// //   const [cropName, setCropName] = useState('');
// //   const [image, setImage] = useState<File | null>(null);
// //   const [imagePreview, setImagePreview] = useState<string>('');
// //   const [loading, setLoading] = useState(false);
// //   const [analysis, setAnalysis] = useState<{
// //     disease?: string;
// //     details?: string;
// //     treatment?: string;
// //     prevention?: string;
// //   } | null>(null);

// //   const GEMINI_API_KEY = 'AIzaSyAJQSqjLfUr7NDnEAFz6Y60jABfbDEKJps';

// //   // 📸 Handle Image Upload
// //   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (file) {
// //       setImage(file);
// //       const reader = new FileReader();
// //       reader.onloadend = () => setImagePreview(reader.result as string);
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   // 🤖 Analyze with Gemini 2.0 Flash
// //   const handleAnalyze = async () => {
// //     if (!cropName || !image) {
// //       toast.error('Please fill all fields and upload an image.');
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       const reader = new FileReader();
// //       reader.onloadend = async () => {
// //         const base64Image = reader.result as string;

// //         const prompt = `
// // You are an expert plant pathologist. Analyze the uploaded crop image and provide a **structured JSON** response with these keys:
// // {
// //   "disease": "Disease name",
// //   "details": "Short and clear description (causes, visible symptoms, and impact)",
// //   "treatment": "Recommended treatment and cure methods",
// //   "prevention": "Preventive measures and care suggestions"
// // }
// // Crop name: ${cropName}.
// // Only output valid JSON.
// //         `;

// //         try {
// //           const response = await axios.post(
// //             `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
// //             {
// //               contents: [
// //                 {
// //                   parts: [
// //                     { text: prompt },
// //                     {
// //                       inline_data: {
// //                         mime_type: 'image/jpeg',
// //                         data: base64Image.split(',')[1],
// //                       },
// //                     },
// //                   ],
// //                 },
// //               ],
// //             }
// //           );

// //           const rawText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || '';
// //           const parsed = JSON.parse(rawText.trim());
// //           setAnalysis(parsed);
// //           toast.success('Analysis Complete!');
// //         } catch (error) {
// //           console.error('Gemini error:', error);
// //           toast.error('Failed to analyze the image.');
// //         } finally {
// //           setLoading(false);
// //         }
// //       };
// //       reader.readAsDataURL(image);
// //     } catch (error) {
// //       console.error(error);
// //       toast.error('Unexpected error occurred.');
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="flex min-h-screen bg-gradient-to-br from-green-50 to-white">
// //       <Sidebar />
// //       <main className="flex-1 p-8">
// //         <div className="mb-6">
// //           <h1 className="text-3xl font-bold text-green-700">{t('diseaseDetection')}</h1>
// //           <p className="text-gray-500">{t('diseaseDetectionDesc')}</p>
// //         </div>

// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //           {/* Upload Section */}
// //           <Card className="p-6 border-green-200 shadow-lg">
// //             <h2 className="text-lg font-semibold mb-4 text-green-700">
// //               {t('uploadCropImage')}
// //             </h2>

// //             <div className="space-y-4">
// //               <div>
// //                 <Label htmlFor="cropName">{t('cropName')}</Label>
// //                 <Input
// //                   id="cropName"
// //                   placeholder="e.g. Tomato, Wheat, Paddy..."
// //                   value={cropName}
// //                   onChange={(e) => setCropName(e.target.value)}
// //                 />
// //               </div>

// //               <div>
// //                 <Label>{t('cropImage')}</Label>
// //                 <div
// //                   className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center cursor-pointer hover:border-green-500 transition-colors"
// //                   onClick={() => document.getElementById('imageUpload')?.click()}
// //                 >
// //                   {imagePreview ? (
// //                     <img
// //                       src={imagePreview}
// //                       alt="Preview"
// //                       className="max-h-48 mx-auto rounded-lg shadow-md"
// //                     />
// //                   ) : (
// //                     <>
// //                       <Upload className="w-10 h-10 mx-auto mb-2 text-green-500" />
// //                       <p className="text-sm font-medium text-green-600">
// //                         Click to upload
// //                       </p>
// //                       <p className="text-xs text-gray-400 mt-1">
// //                         Supported formats: JPG, PNG
// //                       </p>
// //                     </>
// //                   )}
// //                 </div>
// //                 <input
// //                   id="imageUpload"
// //                   type="file"
// //                   accept="image/*"
// //                   className="hidden"
// //                   onChange={handleImageChange}
// //                 />
// //               </div>

// //               <Button
// //                 onClick={handleAnalyze}
// //                 disabled={loading}
// //                 className="w-full bg-green-600 hover:bg-green-700 text-white"
// //               >
// //                 {loading ? 'Analyzing...' : 'Detect Disease'}
// //               </Button>
// //             </div>
// //           </Card>

// //           {/* Output Section */}
// //           {analysis ? (
// //             <div className="space-y-6">
// //               {/* Disease Name Card */}
// //               <Card className="shadow-md border-green-300">
// //                 <CardHeader className="bg-green-600 text-white rounded-t-lg">
// //                   <CardTitle className="flex items-center gap-2">
// //                     <Stethoscope className="w-5 h-5" /> Disease Identified
// //                   </CardTitle>
// //                 </CardHeader>
// //                 <CardContent className="p-4 text-lg font-semibold text-center text-green-700">
// //                   {analysis.disease || 'Not detected'}
// //                 </CardContent>
// //               </Card>

// //               {/* Disease Details */}
// //               <Card className="shadow-md border-green-200">
// //                 <CardHeader>
// //                   <CardTitle className="flex items-center gap-2 text-green-700">
// //                     <AlertCircle className="w-5 h-5" /> Disease Details
// //                   </CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <p className="text-gray-700 text-sm leading-relaxed">
// //                     {analysis.details || 'No details available.'}
// //                   </p>
// //                 </CardContent>
// //               </Card>

// //               {/* Treatment */}
// //               <Card className="shadow-md border-green-200">
// //                 <CardHeader>  
// //                   <CardTitle className="flex items-center gap-2 text-green-700">
// //                     <Leaf className="w-5 h-5" /> Treatment & Cure
// //                   </CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <p className="text-gray-700 text-sm leading-relaxed">
// //                     {analysis.treatment || 'No treatment info available.'}
// //                   </p>
// //                 </CardContent>
// //               </Card>

// //               {/* Prevention */}
// //               <Card className="shadow-md border-green-200">
// //                 <CardHeader>
// //                   <CardTitle className="flex items-center gap-2 text-green-700">
// //                     <Shield className="w-5 h-5" /> Preventive Measures
// //                   </CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <p className="text-gray-700 text-sm leading-relaxed">
// //                     {analysis.prevention || 'No preventive info available.'}
// //                   </p>
// //                 </CardContent>
// //               </Card>
// //             </div>
// //           ) : (
// //             <Card className="p-6 flex items-center justify-center border-green-100">
// //               <div className="text-center py-8">
// //                 <AlertCircle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
// //                 <p className="text-sm text-gray-500">
// //                   Upload an image to start analysis.
// //                 </p>
// //               </div>
// //             </Card>
// //           )}
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }
// import { Sidebar } from '@/components/Sidebar';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Upload, AlertCircle, Leaf, Shield, Stethoscope } from 'lucide-react';
// import { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'sonner';
// import { useLanguage } from '@/contexts/LanguageContext';

// export default function DiseaseDetection() {
//   const { t } = useLanguage();
//   const [cropName, setCropName] = useState('');
//   const [image, setImage] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string>('');
//   const [loading, setLoading] = useState(false);
//   const [analysis, setAnalysis] = useState<{
//     disease?: string;
//     details?: string;
//     treatment?: string;
//     prevention?: string;
//   } | null>(null);

//   const GEMINI_API_KEY = 'AIzaSyAJQSqjLfUr7NDnEAFz6Y60jABfbDEKJps';

//   // 📸 Handle Image Upload
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => setImagePreview(reader.result as string);
//       reader.readAsDataURL(file);
//     }
//   };

//   // 🤖 Analyze with Gemini 2.0 Flash
//   const handleAnalyze = async () => {
//     if (!cropName || !image) {
//       toast.error('Please fill all fields and upload an image.');
//       return;
//     }

//     setLoading(true);
//     setAnalysis(null);

//     try {
//       const reader = new FileReader();
//       reader.onloadend = async () => {
//         const base64Image = reader.result as string;

//         const prompt = `
// You are an expert plant pathologist. Analyze the uploaded crop image and provide a structured JSON response with these keys:
// {
//   "disease": "Disease name",
//   "details": "Short and clear description (causes, visible symptoms, and impact)",
//   "treatment": "Recommended treatment and cure methods",
//   "prevention": "Preventive measures and care suggestions"
// }
// Crop name: ${cropName}.
// Only output valid JSON, no explanations or extra text.
//         `;

//         try {
//           const response = await axios.post(
//             `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
//             {
//               contents: [
//                 {
//                   parts: [
//                     { text: prompt },
//                     {
//                       inline_data: {
//                         mime_type: 'image/jpeg',
//                         data: base64Image.split(',')[1],
//                       },
//                     },
//                   ],
//                 },
//               ],
//             }
//           );

//           let rawText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

//           // 🧩 Clean Gemini's response if wrapped in ```json ... ```
//           rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();

//           let parsed;
//           try {
//             parsed = JSON.parse(rawText);
//           } catch (err) {
//             console.warn('Non-JSON response, showing raw text instead.');
//             parsed = { details: rawText };
//           }

//           setAnalysis(parsed);
//           toast.success('Analysis Complete!');
//         } catch (error) {
//           console.error('Gemini error:', error);
//           toast.error('Failed to analyze the image.');
//         } finally {
//           setLoading(false);
//         }
//       };

//       reader.readAsDataURL(image);
//     } catch (error) {
//       console.error(error);
//       toast.error('Unexpected error occurred.');
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-green-50 to-white">
//       <Sidebar />
//       <main className="flex-1 p-8">
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold text-green-700">{t('diseaseDetection')}</h1>
//           <p className="text-gray-500">{t('diseaseDetectionDesc')}</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Upload Section */}
//           <Card className="p-6 border-green-200 shadow-lg">
//             <h2 className="text-lg font-semibold mb-4 text-green-700">
//               {t('uploadCropImage')}
//             </h2>

//             <div className="space-y-4">
//               <div>
//                 <Label htmlFor="cropName">{t('cropName')}</Label>
//                 <Input
//                   id="cropName"
//                   placeholder="e.g. Tomato, Wheat, Paddy..."
//                   value={cropName}
//                   onChange={(e) => setCropName(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <Label>{t('cropImage')}</Label>
//                 <div
//                   className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center cursor-pointer hover:border-green-500 transition-colors"
//                   onClick={() => document.getElementById('imageUpload')?.click()}
//                 >
//                   {imagePreview ? (
//                     <img
//                       src={imagePreview}
//                       alt="Preview"
//                       className="max-h-48 mx-auto rounded-lg shadow-md"
//                     />
//                   ) : (
//                     <>
//                       <Upload className="w-10 h-10 mx-auto mb-2 text-green-500" />
//                       <p className="text-sm font-medium text-green-600">
//                         Click to upload
//                       </p>
//                       <p className="text-xs text-gray-400 mt-1">
//                         Supported formats: JPG, PNG
//                       </p>
//                     </>
//                   )}
//                 </div>
//                 <input
//                   id="imageUpload"
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={handleImageChange}
//                 />
//               </div>

//               <Button
//                 onClick={handleAnalyze}
//                 disabled={loading}
//                 className="w-full bg-green-600 hover:bg-green-700 text-white"
//               >
//                 {loading ? 'Analyzing...' : 'Detect Disease'}
//               </Button>
//             </div>
//           </Card>

//           {/* Output Section */}
//           {analysis ? (
//             <div className="space-y-6">
//               {/* Disease Name Card */}
//               <Card className="shadow-md border-green-300">
//                 <CardHeader className="bg-green-600 text-white rounded-t-lg">
//                   <CardTitle className="flex items-center gap-2">
//                     <Stethoscope className="w-5 h-5" /> Disease Identified
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="p-4 text-lg font-semibold text-center text-green-700">
//                   {analysis.disease || 'Not detected'}
//                 </CardContent>
//               </Card>

//               {/* Disease Details */}
//               <Card className="shadow-md border-green-200">
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2 text-green-700">
//                     <AlertCircle className="w-5 h-5" /> Disease Details
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-gray-700 text-sm leading-relaxed">
//                     {analysis.details || 'No details available.'}
//                   </p>
//                 </CardContent>
//               </Card>

//               {/* Treatment */}
//               <Card className="shadow-md border-green-200">
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2 text-green-700">
//                     <Leaf className="w-5 h-5" /> Treatment & Cure
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-gray-700 text-sm leading-relaxed">
//                     {analysis.treatment || 'No treatment info available.'}
//                   </p>
//                 </CardContent>
//               </Card>

//               {/* Prevention */}
//               <Card className="shadow-md border-green-200">
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2 text-green-700">
//                     <Shield className="w-5 h-5" /> Preventive Measures
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-gray-700 text-sm leading-relaxed">
//                     {analysis.prevention || 'No preventive info available.'}
//                   </p>
//                 </CardContent>
//               </Card>
//             </div>
//           ) : (
//             <Card className="p-6 flex items-center justify-center border-green-100">
//               <div className="text-center py-8">
//                 <AlertCircle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
//                 <p className="text-sm text-gray-500">
//                   Upload an image to start analysis.
//                 </p>
//               </div>
//             </Card>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }
import { Sidebar } from '@/components/Sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, AlertCircle, Leaf, Shield, Stethoscope } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

export default function DiseaseDetection() {
  const { language, t } = useLanguage(); // ✅ Only one 't' from context

  const [cropName, setCropName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<{
    disease?: string;
    details?: string;
    treatment?: string;
    prevention?: string;
  } | null>(null);

  const GEMINI_API_KEY = 'AIzaSyAJQSqjLfUr7NDnEAFz6Y60jABfbDEKJps'; // ⚠️ Replace with your real key

  // 🌐 Map languages for Gemini prompt
  const languageMap: Record<string, string> = {
    en: 'English',
    hi: 'Hindi',
    mr: 'Marathi',
    gu: 'Gujarati',
  };
  const selectedLanguage = languageMap[language] || 'English';

  // 📸 Handle Image Upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // 🤖 Analyze Crop Image with Gemini
  const handleAnalyze = async () => {
    if (!cropName || !image) {
      toast.error('Please fill all fields and upload an image.');
      return;
    }

    setLoading(true);
    setAnalysis(null);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result as string;

        const prompt = `
You are an expert plant pathologist.
Analyze the uploaded crop image and provide the result in ${selectedLanguage} language only.
Return a **valid JSON** with the following structure:
{
  "disease": "Disease name",
  "details": "Short and clear description (causes, symptoms, and impact)",
  "treatment": "Recommended treatment and cure methods",
  "prevention": "Preventive measures and care suggestions"
}
Crop name: ${cropName}.
Output only valid JSON, no markdown or extra text.
        `;

        try {
          const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
            {
              contents: [
                {
                  parts: [
                    { text: prompt },
                    {
                      inline_data: {
                        mime_type: 'image/jpeg',
                        data: base64Image.split(',')[1],
                      },
                    },
                  ],
                },
              ],
            }
          );

          // 🧩 Extract text safely
          let rawText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

          // Clean Gemini response (in case it includes ```json ... ```)
          rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();

          let parsed;
          try {
            parsed = JSON.parse(rawText);
          } catch (err) {
            console.warn('Response was not valid JSON, showing raw text.');
            parsed = { details: rawText };
          }

          setAnalysis(parsed);
          toast.success('Analysis Complete!');
        } catch (error) {
          console.error('Gemini error:', error);
          toast.error('Failed to analyze the image.');
        } finally {
          setLoading(false);
        }
      };

      reader.readAsDataURL(image);
    } catch (error) {
      console.error(error);
      toast.error('Unexpected error occurred.');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 to-white">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-green-700">{t('diseaseDetection')}</h1>
          <p className="text-gray-500">{t('diseaseDetectionDesc')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <Card className="p-6 border-green-200 shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-green-700">
              {t('uploadCropImage')}
            </h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="cropName">{t('cropName')}</Label>
                <Input
                  id="cropName"
                  placeholder="e.g. Tomato, Wheat, Paddy..."
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                />
              </div>

              <div>
                <Label>{t('cropImage')}</Label>
                <div
                  className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center cursor-pointer hover:border-green-500 transition-colors"
                  onClick={() => document.getElementById('imageUpload')?.click()}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-48 mx-auto rounded-lg shadow-md"
                    />
                  ) : (
                    <>
                      <Upload className="w-10 h-10 mx-auto mb-2 text-green-500" />
                      <p className="text-sm font-medium text-green-600">
                        Click to upload
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Supported formats: JPG, PNG
                      </p>
                    </>
                  )}
                </div>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                {loading ? 'Analyzing...' : 'Detect Disease'}
              </Button>
            </div>
          </Card>

          {/* Output Section */}
          {analysis ? (
            <div className="space-y-6">
              {/* Disease Name Card */}
              <Card className="shadow-md border-green-300">
                <CardHeader className="bg-green-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="w-5 h-5" /> Disease Identified
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 text-lg font-semibold text-center text-green-700">
                  {analysis.disease || 'Not detected'}
                </CardContent>
              </Card>

              {/* Details */}
              <Card className="shadow-md border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <AlertCircle className="w-5 h-5" /> Disease Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {analysis.details || 'No details available.'}
                  </p>
                </CardContent>
              </Card>

              {/* Treatment */}
              <Card className="shadow-md border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <Leaf className="w-5 h-5" /> Treatment & Cure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {analysis.treatment || 'No treatment info available.'}
                  </p>
                </CardContent>
              </Card>

              {/* Prevention */}
              <Card className="shadow-md border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <Shield className="w-5 h-5" /> Preventive Measures
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {analysis.prevention || 'No preventive info available.'}
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="p-6 flex items-center justify-center border-green-100">
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p className="text-sm text-gray-500">
                  Upload an image to start analysis.
                </p>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}