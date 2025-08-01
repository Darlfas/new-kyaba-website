import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

export default function BlockchainSimulator() {
  const [blocks, setBlocks] = useState([
    { 
      id: 0, 
      data: 'Genesis Block', 
      hash: '0000abc123def456', 
      prevHash: '0000000000000000', 
      timestamp: Date.now() - 3600000,
      nonce: 0
    }
  ]);
  const [newBlockData, setNewBlockData] = useState('');
  const [mining, setMining] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState(null);

  const generateHash = (data, prevHash, nonce) => {
    // Simulate proof of work - find hash starting with zeros
    const combined = data + prevHash + nonce;
    let hash = '';
    for (let i = 0; i < 16; i++) {
      hash += Math.floor(Math.random() * 16).toString(16);
    }
    return '0000' + hash.substring(4);
  };

  const mineBlock = async (data, prevHash) => {
    let nonce = 0;
    let hash = '';
    
    // Simulate mining process
    for (let i = 0; i < 5; i++) {
      await new Promise(resolve => setTimeout(resolve, 400));
      nonce++;
      hash = generateHash(data, prevHash, nonce);
    }
    
    return { hash, nonce };
  };

  const addBlock = async () => {
    if (!newBlockData.trim()) return;
    
    setMining(true);
    
    const prevBlock = blocks[blocks.length - 1];
    const { hash, nonce } = await mineBlock(newBlockData, prevBlock.hash);
    
    const newBlock = {
      id: blocks.length,
      data: newBlockData,
      hash: hash,
      prevHash: prevBlock.hash,
      timestamp: Date.now(),
      nonce: nonce
    };
    
    setBlocks([...blocks, newBlock]);
    setNewBlockData('');
    setMining(false);
  };

  const validateChain = () => {
    for (let i = 1; i < blocks.length; i++) {
      if (blocks[i].prevHash !== blocks[i - 1].hash) {
        return false;
      }
    }
    return true;
  };

  const isChainValid = validateChain();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Interactive Blockchain Simulator
        </h2>
        <div className="flex justify-center items-center space-x-4">
          <Badge variant={isChainValid ? "default" : "destructive"} className="text-sm">
            Chain Status: {isChainValid ? 'Valid ✅' : 'Invalid ❌'}
          </Badge>
          <Badge variant="secondary" className="text-sm">
            Total Blocks: {blocks.length}
          </Badge>
        </div>
      </div>
      
      {/* Add Block Section */}
      <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-purple-200">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            ⛏️ Mine New Block
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              value={newBlockData}
              onChange={(e) => setNewBlockData(e.target.value)}
              placeholder="Enter transaction data, message, or any content..."
              className="flex-1 text-lg"
              disabled={mining}
            />
            <Button 
              onClick={addBlock} 
              disabled={mining || !newBlockData.trim()}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8"
            >
              {mining ? (
                <span className="flex items-center">
                  <span className="animate-spin mr-2">⚡</span>
                  Mining...
                </span>
              ) : (
                'Mine Block'
              )}
            </Button>
          </div>
          {mining && (
            <div className="mt-4 text-center">
              <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4">
                <p className="text-yellow-800 font-medium">
                  🔍 Finding proof of work... This may take a few seconds.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Blockchain Visualization */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
          🔗 Blockchain Structure
        </h3>
        
        <div className="grid gap-6">
          {blocks.map((block, index) => (
            <div key={block.id} className="relative">
              <Card 
                className={`border-2 transition-all duration-300 cursor-pointer ${
                  selectedBlock === block.id 
                    ? 'border-purple-500 shadow-xl scale-105' 
                    : 'border-gray-200 hover:border-purple-300 hover:shadow-lg'
                } ${index === 0 ? 'bg-gradient-to-r from-green-50 to-emerald-50' : 'bg-white'}`}
                onClick={() => setSelectedBlock(selectedBlock === block.id ? null : block.id)}
              >
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center space-x-2">
                      <span className="text-2xl">
                        {index === 0 ? '🌱' : '🧱'}
                      </span>
                      <span>Block #{block.id}</span>
                      {index === 0 && <Badge variant="secondary">Genesis</Badge>}
                    </CardTitle>
                    <span className="text-sm text-gray-500">
                      {new Date(block.timestamp).toLocaleString()}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-semibold text-gray-600">Data:</p>
                        <p className="bg-gray-100 p-2 rounded font-mono text-sm break-all">
                          {block.data}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-600">Nonce:</p>
                        <p className="bg-blue-100 p-2 rounded font-mono text-sm">
                          {block.nonce}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-semibold text-gray-600">Current Hash:</p>
                        <p className="bg-green-100 p-2 rounded font-mono text-xs break-all">
                          {block.hash}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-600">Previous Hash:</p>
                        <p className="bg-purple-100 p-2 rounded font-mono text-xs break-all">
                          {block.prevHash}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {selectedBlock === block.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">Block Details:</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Size:</span> {JSON.stringify(block).length} bytes
                        </div>
                        <div>
                          <span className="font-medium">Valid:</span> 
                          <Badge variant={block.hash.startsWith('0000') ? "default" : "destructive"} className="ml-2">
                            {block.hash.startsWith('0000') ? 'Yes' : 'No'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Connection Arrow */}
              {index < blocks.length - 1 && (
                <div className="flex justify-center my-2">
                  <div className="text-2xl text-purple-500">⬇️</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Educational Info */}
      <Card className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            🎓 How Blockchain Works
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">📝</div>
              <h3 className="font-semibold text-purple-600 mb-2">1. Add Data</h3>
              <p className="text-gray-600 text-sm">
                Enter transaction data or any information you want to store permanently
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">⛏️</div>
              <h3 className="font-semibold text-blue-600 mb-2">2. Mine Block</h3>
              <p className="text-gray-600 text-sm">
                The system finds a "nonce" that creates a hash starting with zeros (proof of work)
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🔗</div>
              <h3 className="font-semibold text-green-600 mb-2">3. Link Chain</h3>
              <p className="text-gray-600 text-sm">
                Each block references the previous block's hash, creating an immutable chain
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}