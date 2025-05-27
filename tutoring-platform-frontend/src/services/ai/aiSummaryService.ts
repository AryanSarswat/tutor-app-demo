import React from 'react';

interface AISummaryServiceProps {
  informalNotes: string;
  subject: string;
  engagement: number;
  comprehension: number;
  execution: number;
  topics: string[];
  otherComments?: string;
}

// This is a placeholder service for sending notes to an AI (ChatGPT) and returning a summary
export const generateAISummary = async ({
  informalNotes,
  subject,
  engagement,
  comprehension,
  execution,
  topics,
  otherComments
}: AISummaryServiceProps): Promise<string> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // In a real implementation, this would make an API call to ChatGPT or similar service
  // For now, we'll generate a mock summary based on the provided data
  
  const topicsText = topics.length > 0 
    ? `We covered the following topics: ${topics.join(', ')}.` 
    : 'No specific topics were recorded for this session.';
    
  const engagementDescription = getEngagementDescription(engagement);
  const comprehensionDescription = getComprehensionDescription(comprehension);
  const executionDescription = getExecutionDescription(execution);
  
  // Extract key points from informal notes (simplified mock version)
  const keyPoints = extractKeyPoints(informalNotes);
  
  // Construct the summary
  let summary = `
    During today's ${subject} session, the student demonstrated ${engagementDescription}.
    
    The student's comprehension of the material was ${comprehensionDescription}, and their ability to execute the concepts was ${executionDescription}.
    
    ${topicsText}
    
    ${keyPoints}
  `.trim();
  
  // Add other comments if provided
  if (otherComments && otherComments.trim()) {
    summary += `\n\nAdditional notes: ${otherComments}`;
  }
  
  return summary;
};

// Helper functions to generate more natural language descriptions
function getEngagementDescription(rating: number): string {
  if (rating >= 9) return 'exceptional engagement and enthusiasm';
  if (rating >= 7) return 'strong engagement throughout the session';
  if (rating >= 5) return 'moderate engagement with the material';
  if (rating >= 3) return 'limited engagement that could be improved';
  return 'minimal engagement that requires attention';
}

function getComprehensionDescription(rating: number): string {
  if (rating >= 9) return 'excellent, with a thorough understanding of concepts';
  if (rating >= 7) return 'good, with a solid grasp of most concepts';
  if (rating >= 5) return 'adequate, though some concepts may need reinforcement';
  if (rating >= 3) return 'developing, with several concepts requiring further explanation';
  return 'limited, suggesting we need to revisit fundamental concepts';
}

function getExecutionDescription(rating: number): string {
  if (rating >= 9) return 'outstanding, with the ability to apply concepts independently';
  if (rating >= 7) return 'proficient, showing good application of learned material';
  if (rating >= 5) return 'satisfactory, though more practice would be beneficial';
  if (rating >= 3) return 'developing, with assistance needed for most applications';
  return 'challenging, requiring significant guidance and additional practice';
}

function extractKeyPoints(notes: string): string {
  // In a real implementation, this would use NLP or AI to extract key points
  // For this mock version, we'll just return a simplified version of the notes
  
  if (!notes || notes.trim().length === 0) {
    return 'No detailed notes were provided for this session.';
  }
  
  if (notes.length <= 100) {
    return notes;
  }
  
  // Simple mock extraction - in reality, this would be much more sophisticated
  const sentences = notes.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  if (sentences.length <= 3) {
    return notes;
  }
  
  // Take first sentence, a middle sentence, and the last sentence
  const firstSentence = sentences[0].trim();
  const middleSentence = sentences[Math.floor(sentences.length / 2)].trim();
  const lastSentence = sentences[sentences.length - 1].trim();
  
  return `${firstSentence}. ${middleSentence}. ${lastSentence}. Overall, the student showed progress during this session.`;
}
