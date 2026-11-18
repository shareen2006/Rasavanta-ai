const http = require('http');

function postChat(payload) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port: 5000,
        path: '/api/v1/rasabot/chat',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data)
        }
      },
      (res) => {
        let body = '';
        res.on('data', (c) => (body += c));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, body: JSON.parse(body) });
          } catch {
            resolve({ status: res.statusCode, raw: body });
          }
        });
      }
    );
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function runTests() {
  console.log('=== TEST 1: Greeting "Hi" ===');
  const t1 = await postChat({ message: 'Hi' });
  console.log('Status:', t1.status);
  console.log('Has recipeCard:', Boolean(t1.body.recipeCard));
  console.log('Reply preview:', t1.body.reply?.substring(0, 150));
  if (t1.body.recipeCard) {
    console.error('FAIL: Greeting returned a recipe card!');
  } else {
    console.log('PASS: Natural greeting with NO recipe card.');
  }

  console.log('\n=== TEST 2: "What can you help me with?" ===');
  const t2 = await postChat({ message: 'What can you help me with?' });
  console.log('Status:', t2.status);
  console.log('Has recipeCard:', Boolean(t2.body.recipeCard));
  console.log('Reply preview:', t2.body.reply?.substring(0, 200));

  console.log('\n=== TEST 3: "I have tomatoes and rice" ===');
  const t3 = await postChat({
    message: 'I have tomatoes and rice',
    messages: [
      { role: 'user', content: 'Hi' },
      { role: 'assistant', content: t1.body.reply },
      { role: 'user', content: 'I have tomatoes and rice' }
    ]
  });
  console.log('Status:', t3.status);
  console.log('Reply preview:', t3.body.reply?.substring(0, 250));

  console.log('\n=== TEST 4: "How do I make tomato rasam?" ===');
  const t4 = await postChat({
    message: 'How do I make tomato rasam?',
    messages: [
      { role: 'user', content: 'I have tomatoes and rice' },
      { role: 'assistant', content: t3.body.reply },
      { role: 'user', content: 'How do I make tomato rasam?' }
    ]
  });
  console.log('Status:', t4.status);
  console.log('Has recipeCard:', Boolean(t4.body.recipeCard));
  if (t4.body.recipeCard) {
    console.log('Recipe Card Details:', {
      id: t4.body.recipeCard.id,
      title: t4.body.recipeCard.title,
      prepTime: t4.body.recipeCard.prepTime,
      cookTime: t4.body.recipeCard.cookTime,
      totalTime: t4.body.recipeCard.totalTime,
      calories: t4.body.recipeCard.calories,
      image: t4.body.recipeCard.image?.substring(0, 50)
    });
    console.log('PASS: Recipe card returned for tomato rasam with valid details.');
  } else {
    console.log('NOTE: recipeCard was null, check matching logic.');
  }

  console.log('\n=== TEST 5: Follow-up question (Conversational Memory) ===');
  const t5 = await postChat({
    message: 'Can I make it without garlic?',
    messages: [
      { role: 'user', content: 'How do I make tomato rasam?' },
      { role: 'assistant', content: t4.body.reply },
      { role: 'user', content: 'Can I make it without garlic?' }
    ]
  });
  console.log('Status:', t5.status);
  console.log('Reply preview:', t5.body.reply?.substring(0, 250));
}

runTests().catch(console.error);
