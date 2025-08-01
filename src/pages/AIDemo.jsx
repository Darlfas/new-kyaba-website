import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles, Brain, Code, FileText, MessageSquare, Image } from 'lucide-react';

const AIDemo = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTool, setSelectedTool] = useState('text');

  const aiTools = [
    { id: 'text', name: 'Text Generation', icon: FileText, description: 'Generate creative content, articles, and stories' },
    { id: 'code', name: 'Code Assistant', icon: Code, description: 'Generate and explain code snippets' },
    { id: 'chat', name: 'AI Chatbot', icon: MessageSquare, description: 'Interactive conversation with AI' },
    { id: 'image', name: 'Image Analysis', icon: Image, description: 'Analyze and describe images' }
  ];

  const samplePrompts = {
    text: [
      'Write a short story about a robot learning to paint',
      'Create a product description for a smart home device',
      'Write a motivational speech about learning new skills'
    ],
    code: [
      'Create a Python function to calculate fibonacci numbers',
      'Explain how React hooks work with examples',
      'Write a JavaScript function to validate email addresses'
    ],
    chat: [
      'What are the benefits of learning blockchain technology?',
      'How can AI help in education?',
      'Explain machine learning in simple terms'
    ],
    image: [
      'Analyze this architectural photo',
      'Describe the emotions in this portrait',
      'Identify objects in this scene'
    ]
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = {
        text: `Here's a creative response to your prompt: "${prompt}"\n\nThis is a simulated AI-generated text that demonstrates how our AI tools can help you create engaging content. In a real implementation, this would connect to actual AI services like OpenAI's GPT or similar models to provide intelligent, contextual responses.`,
        code: `// Generated code for: ${prompt}\n\nfunction example() {\n  // This is a simulated code response\n  console.log("AI-generated code would appear here");\n  return "This demonstrates our code generation capabilities";\n}\n\n// In production, this would connect to AI coding assistants`,
        chat: `AI Assistant: Thank you for your question about "${prompt}". This is a demonstration of our AI chatbot capabilities. In the full version, I would provide detailed, helpful responses tailored to your specific needs and learning goals.`,
        image: `Image Analysis Results:\n\nThis is a simulated image analysis response for: "${prompt}"\n\nIn the actual implementation, our AI would analyze uploaded images and provide detailed descriptions, object detection, and contextual information.`
      };
      
      setResponse(responses[selectedTool] || responses.text);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-purple-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">KYABA AI Tools in Action</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the power of Artificial Intelligence with our interactive demonstrations.
          </p>
        </div>

        {/* AI Tools Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {aiTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Card 
                key={tool.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedTool === tool.id ? 'ring-2 ring-purple-500 bg-purple-50' : ''
                }`}
                onClick={() => setSelectedTool(tool.id)}
              >
                <CardContent className="p-4 text-center">
                  <Icon className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <h3 className="font-semibold text-sm mb-1">{tool.name}</h3>
                  <p className="text-xs text-gray-600">{tool.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                Generate {aiTools.find(t => t.id === selectedTool)?.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What would you like the AI to generate?
                </label>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={`Enter your ${selectedTool} prompt here...`}
                  className="min-h-[120px]"
                />
              </div>
              
              {/* Sample Prompts */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Try these examples:</p>
                <div className="flex flex-wrap gap-2">
                  {samplePrompts[selectedTool]?.map((sample, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-purple-100"
                      onClick={() => setPrompt(sample)}
                    >
                      {sample}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button 
                onClick={handleGenerate}
                disabled={!prompt.trim() || isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate with AI
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card>
            <CardHeader>
              <CardTitle>AI Response</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-4" />
                    <p className="text-gray-600">AI is thinking...</p>
                  </div>
                </div>
              ) : response ? (
                <div className="bg-gray-50 rounded-lg p-4">
                  <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                    {response}
                  </pre>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Brain className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Enter a prompt and click "Generate with AI" to see the magic happen!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose KYABA AI Tools?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <Sparkles className="w-8 h-8 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Cutting-Edge AI</h3>
              <p className="text-gray-600 text-sm">Powered by the latest AI models for superior results</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <Brain className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Educational Focus</h3>
              <p className="text-gray-600 text-sm">Designed specifically for learning and skill development</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <Code className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Multi-Purpose</h3>
              <p className="text-gray-600 text-sm">From code generation to creative writing and beyond</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDemo;