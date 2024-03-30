# Node responsible
class Node:
    def __init__(self):
        self.isWord = False
        self.children = {}

# Implementation fo Trie
class Trie:
    root:Node
    def __init__(self):
        self.root = Node()

    def insert(self, word:str) -> None:
        currentNode:Node = self.root

        for c in word:
            if c not in currentNode.children:
                currentNode.children[c] = Node()
            currentNode = currentNode.children[c]
        currentNode.isWord = True
    
    def search(self, word:str)-> bool:
        currentNode:Node = self.root

        for c in word:
            if c not in currentNode.children:
                return False
            currentNode = currentNode.children[c]
        return currentNode.isWord


    def startWith(self, word:str)->bool:
        currentNode:Node = self.root
        for c in word:
            if c not in currentNode.children:
                return False
            currentNode = currentNode.children[c]
        return True
    
    def getSimilarWord(self, prefix: str) -> list:
        if not self.startWith(prefix):
            return []

        similarWords = []
        currentNode = self.root

        # Traverse to the node corresponding to the prefix
        for c in prefix:
            currentNode = currentNode.children[c]

        # Call a recursive function to find similar words starting from the currentNode
        self.findSimilarWords(currentNode, prefix, similarWords)

        return similarWords

    def findSimilarWords(self, node: Node, word: str, similarWords: list):
        if node.isWord:
            similarWords.append(word)

        for char, childNode in node.children.items():
            self.findSimilarWords(childNode, word + char, similarWords)
    
    def delete(self, word:str)->bool:
        if not self.search(word):
            return False
        nodesTraversed = []
        currentNode:Node = self.root
        for c in word:
            nodesTraversed.append((currentNode, c))
            currentNode = currentNode.children[c]
            
        currentNode.isWord = False

        if len(currentNode.children) == 0 and not currentNode.isWord:
            for node, c in reversed(nodesTraversed):
                del node.children[c]
                if len(node.children) > 0 or node.isWord:
                    break
        return True
