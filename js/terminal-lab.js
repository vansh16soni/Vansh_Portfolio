/**
 * Interactive Developer Terminal Controller (~/more-to-know)
 * Autonomous client-side terminal emulator supporting real CLI commands:
 * `ls`, `cd`, `cat`, `clear`, `help` and synchronized file tree navigation.
 */

(function () {
  'use strict';

  const DIRECTORIES = {
    'fullstack-apps': {
      name: 'fullstack-apps',
      label: 'Full-Stack Applications',
      repos: ['King-Theif', 'HCL_Nova', 'Pixel_Arena', 'TeamNova', 'minor-project']
    },
    'java-spring': {
      name: 'java-spring',
      label: 'Java & Spring Ecosystem',
      repos: ['LibManage_Java', 'Java_Mini_Projects', 'Java_Practice_Code']
    },
    'games-creative': {
      name: 'games-creative',
      label: 'Games & Creative Coding',
      repos: ['7_Sins', 'React_practice_projects']
    }
  };

  const REPOSITORIES = {
    'King-Theif': {
      id: 'King-Theif',
      name: 'King-Theif',
      category: 'fullstack-apps',
      categoryLabel: 'Full-Stack Apps',
      title: 'Raja Mantri Chor Sipahi (RMCS) — 3D Multiplayer Game',
      badge: 'Live on Render',
      lang: 'React + Three.js',
      icon: '🎮',
      stars: 'Live on Render',
      repoUrl: 'https://github.com/vansh16soni/King-Theif',
      liveUrl: 'https://king-theif.onrender.com',
      description: 'An immersive, real-time 4-player social deduction game reviving the traditional royal Indian bluffing game with modern 3D WebGL scenes and AI bot mechanics.',
      techStack: ['React.js', 'Three.js (WebGL)', 'Node.js', 'Socket.io', 'MongoDB', 'OpenAI API', 'Tailwind CSS'],
      architecture: [
        'Real-time WebSocket synchronization across 4 concurrent players with state reconciliation.',
        'Procedural 3D scene graphs with orbital camera controls, dynamic lighting, and table perspective.',
        'Dual player mode: seamless matchmaking for 4 human players or AI-assisted bot players driven by LLM prompts.',
        'Adaptive dark/light theme switching with glassmorphic tactile overlays and sound synthesis.'
      ],
      quickStats: {
        type: '3D Multiplayer Game',
        architecture: 'Client-Server WebSockets',
        timing: 'Sub-30ms Event Latency'
      }
    },
    'HCL_Nova': {
      id: 'HCL_Nova',
      name: 'HCL_Nova',
      category: 'fullstack-apps',
      categoryLabel: 'Full-Stack Apps',
      title: 'LearnWise AI — Adaptive Learning Mentor',
      badge: 'AI Knowledge Graph',
      lang: 'JavaScript / Full-Stack',
      icon: '🧠',
      stars: 'Hackathon',
      repoUrl: 'https://github.com/vansh16soni/HCL_Nova',
      liveUrl: '',
      description: 'Engineered for the HCL Nova Hackathon. Implements goal-first "backward learning" course roadmaps, an interactive skill knowledge graph, an AI Learning Doctor, and career simulation engines.',
      techStack: ['React / Tailwind', 'JavaScript (ES6+)', 'Node.js / Express', 'RESTful API', 'Knowledge Graph', 'AI Inference'],
      architecture: [
        'Dynamic backward learning engine generating milestone DAGs from career destination inputs.',
        'Interactive skill knowledge graph visualizing dependency nodes and prerequisite unlocks.',
        'AI Learning Doctor diagnostic chatbot analyzing code errors and explaining blockers in plain text.',
        'Simulated career progression model forecasting skill-readiness and technical interview milestones.'
      ],
      quickStats: {
        type: 'AI Education Engine',
        architecture: 'Goal-First DAG Roadmaps',
        timing: 'Real-Time Graph Traversal'
      }
    },
    'Pixel_Arena': {
      id: 'Pixel_Arena',
      name: 'Pixel_Arena',
      category: 'fullstack-apps',
      categoryLabel: 'Full-Stack Apps',
      title: 'Pixel Arena — Multi-Canvas Gaming Arena',
      badge: 'Live on Render',
      lang: 'HTML5 Canvas / JS',
      icon: '🕹️',
      stars: 'Live App',
      repoUrl: 'https://github.com/vansh16soni/Pixel_Arena',
      liveUrl: 'https://pixel-arena-1.onrender.com/',
      description: 'High-speed browser-based gaming arena rendered on HTML5 Canvas 2D with dynamic collision vectors, particle emitters, sound effects, and deployed live in production on Render.',
      techStack: ['JavaScript', 'HTML5 Canvas 2D', 'CSS3 Glassmorphism', 'Node.js', 'Render Cloud Deployment'],
      architecture: [
        'Locked 60 FPS delta-time render loop ensuring uniform physics regardless of monitor refresh rate.',
        'High-density 2D particle simulation engine handling explosion sparks, shockwaves, and smoke trails.',
        'Low-latency input mapping with multi-key vector buffering and boundary collision handling.',
        'Cloud-hosted production instance running on Render with automatic asset compression.'
      ],
      quickStats: {
        type: 'Browser Game Engine',
        architecture: 'HTML5 Canvas 2D Loop',
        timing: '60 FPS Delta-Time'
      }
    },
    'TeamNova': {
      id: 'TeamNova',
      name: 'TeamNova',
      category: 'fullstack-apps',
      categoryLabel: 'Full-Stack Apps',
      title: 'Team Nova — Agile Collaboration Workspace',
      badge: 'Team Platform',
      lang: 'Full-Stack Web',
      icon: '🚀',
      stars: 'Open Source',
      repoUrl: 'https://github.com/vansh16soni/TeamNova',
      liveUrl: '',
      description: 'A collaborative developer portal designed for rapid hackathon sprint coordination, shared project telemetry, sprint milestone tracking, and unified repo status.',
      techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'RESTful API', 'Responsive UI'],
      architecture: [
        'Modular sprint tracking dashboard with drag-and-drop task status transitions.',
        'Shared telemetry board providing team members with real-time repo and build metrics.',
        'Secure token-based authentication with role-separated member and admin capabilities.'
      ],
      quickStats: {
        type: 'Team Workspace',
        architecture: 'RESTful Micro-Services',
        timing: 'Agile Sprint Sync'
      }
    },
    'minor-project': {
      id: 'minor-project',
      name: 'minor-project',
      category: 'fullstack-apps',
      categoryLabel: 'Full-Stack Apps',
      title: 'Academic Engineering Capstone Prototype',
      badge: 'Capstone System',
      lang: 'JavaScript / Node.js',
      icon: '⚙️',
      stars: 'Academic',
      repoUrl: 'https://github.com/vansh16soni/minor-project',
      liveUrl: '',
      description: 'Comprehensive college minor project integrating multi-tier systems architecture, normalized database design, middleware validation pipelines, and modular service controllers.',
      techStack: ['Node.js', 'Express', 'SQL / NoSQL Schemas', 'JWT Auth', 'REST API Architecture'],
      architecture: [
        'Multi-tiered architectural separation between routing, business service layer, and data persistence.',
        'Robust middleware validation safeguarding payload integrity and preventing malformed inputs.',
        'Normalized relational data schema with transactional consistency and cascade constraints.'
      ],
      quickStats: {
        type: 'Academic Capstone',
        architecture: 'Three-Tier MVC',
        timing: 'Validated Endpoints'
      }
    },
    'LibManage_Java': {
      id: 'LibManage_Java',
      name: 'LibManage_Java',
      category: 'java-spring',
      categoryLabel: 'Java & Spring',
      title: 'LibManage — Production-Grade Spring Boot 3 LMS',
      badge: 'Live on Render',
      lang: 'Java 17',
      icon: '📚',
      stars: 'Live on Render',
      repoUrl: 'https://github.com/vansh16soni/LibManage_Java',
      liveUrl: 'https://libmanage-java.onrender.com',
      description: 'A lightweight, production-grade Library Management System built with Spring Boot 3.3.4, Java 17, and Thymeleaf. Features thread-safe JSON-based local database storage and custom session security.',
      techStack: ['Spring Boot 3.3.4', 'Java 17', 'Thymeleaf', 'Thread-Safe JSON Persistence', 'Session Auth', 'Bootstrap 5'],
      architecture: [
        'Streamlined monolithic MVC application powered by Spring Boot IoC dependency injection.',
        'Custom-built thread-safe JSON database storage engine using reentrant read/write locks.',
        'Automated overdue fine computation with configurable tier-based penalty calculation algorithms.',
        'Lightweight session security model eliminating heavyweight enterprise container overhead.'
      ],
      quickStats: {
        type: 'Enterprise Java LMS',
        architecture: 'Spring Boot 3.3.4 MVC',
        timing: 'Thread-Safe JSON I/O'
      }
    },
    'Java_Mini_Projects': {
      id: 'Java_Mini_Projects',
      name: 'Java_Mini_Projects',
      category: 'java-spring',
      categoryLabel: 'Java & Spring',
      title: 'Java Mini Projects — OOP & Architecture Suite',
      badge: 'OOP Patterns',
      lang: 'Java 17',
      icon: '🧩',
      stars: 'Design Patterns',
      repoUrl: 'https://github.com/vansh16soni/Java_Mini_Projects',
      liveUrl: '',
      description: 'A modular suite of Java system applications and console architectures demonstrating core Object-Oriented Programming (OOP) principles, polymorphic fine calculations, member models, and file persistence.',
      techStack: ['Java 17', 'OOP Design Patterns', 'Polymorphism', 'File I/O Persistence', 'Collections Framework'],
      architecture: [
        'Strict encapsulation and abstraction isolating persistence engines from business domain logic.',
        'Extensible polymorphism allowing dynamic calculation strategies without modifying client classes.',
        'File serialization and stream readers maintaining state across execution sessions.',
        'Comprehensive exception handling hierarchy preventing unhandled runtime crashes.'
      ],
      quickStats: {
        type: 'OOP Architecture Lab',
        architecture: 'Polymorphic Interface Layer',
        timing: 'Zero-Dependency Java'
      }
    },
    'Java_Practice_Code': {
      id: 'Java_Practice_Code',
      name: 'Java_Practice_Code',
      category: 'java-spring',
      categoryLabel: 'Java & Spring',
      title: 'Java Practice Codes & Algorithm Suite',
      badge: '12 Practice Programs',
      lang: 'Java 17',
      icon: '⚡',
      stars: 'Competitive DSA',
      repoUrl: 'https://github.com/vansh16soni/Java_Practice_Code',
      liveUrl: '',
      description: 'Extensive algorithmic repository containing optimized implementations of Data Structures & Algorithms, LeetCode challenges, dynamic programming, and thread-safe concurrency models.',
      techStack: ['Java 17', 'Data Structures', 'Tree & Graph Algorithms', 'Dynamic Programming', 'Concurrency / Threads'],
      architecture: [
        'Curated solutions for Trees, Heaps, Disjoint Sets, and Graph traversals (BFS, DFS, Dijkstra).',
        'Dynamic programming solutions documented with state transitions and space-optimized arrays.',
        'Two-pointer and sliding-window techniques delivering optimal O(N) runtime efficiencies.',
        'Multithreaded concurrency architectures with ReentrantLock, Condition variables, and Custom Thread Pools.'
      ],
      quickStats: {
        type: 'Algorithm & Concurrency Lab',
        architecture: 'Time-Optimized Java 17',
        timing: 'O(1) to O(N log N)'
      }
    },
    '7_Sins': {
      id: '7_Sins',
      name: '7_Sins',
      category: 'games-creative',
      categoryLabel: 'Games & Creative',
      title: '7 Sins — Creative Narrative & Visual Simulation',
      badge: 'Live on Render',
      lang: 'JavaScript / Web',
      icon: '🎭',
      stars: 'Live on Render',
      repoUrl: 'https://github.com/vansh16soni/7_Sins',
      liveUrl: 'https://seven-sins.onrender.com',
      description: 'An atmospheric interactive storytelling and visual state machine exploring thematic stages with bespoke audio cues, CSS visual filters, dynamic choice trees, and canvas transitions.',
      techStack: ['JavaScript (ES6+)', 'CSS3 Custom Properties', 'Audio API', 'Finite State Machine', 'Interactive DOM'],
      architecture: [
        'Deterministic Finite State Machine (FSM) transitioning narrative chapters and atmospheric UI themes.',
        'Procedural visual distortion and keyframe shaders responsive to user decision paths.',
        'Event-driven audio synthesizer triggering spatial sound feedback on scene navigation.'
      ],
      quickStats: {
        type: 'Narrative State Engine',
        architecture: 'Finite State Machine (FSM)',
        timing: 'CSS3 Kinetic Shaders'
      }
    },
    'React_practice_projects': {
      id: 'React_practice_projects',
      name: 'React_practice_projects',
      category: 'games-creative',
      categoryLabel: 'Games & Creative',
      title: 'React Component Sandbox & Hooks Lab',
      badge: 'React Patterns',
      lang: 'React.js',
      icon: '⚛️',
      stars: 'Frontend Lab',
      repoUrl: 'https://github.com/vansh16soni/React_practice_projects',
      liveUrl: '',
      description: 'A curated sandbox of modular React applications exploring state management, custom hook composition, decoupled reducer pipelines, synthetic event optimizations, and reusable component libraries.',
      techStack: ['React.js', 'Custom Hooks', 'Context API', 'useReducer Pipeline', 'CSS Modules', 'Component Patterns'],
      architecture: [
        'Custom hooks abstracting API fetching, debounced inputs, local storage sync, and window metrics.',
        'Complex state management using useReducer and Context API to eliminate prop drilling.',
        'Strict memoization patterns (useMemo, useCallback, React.memo) preventing redundant render cycles.'
      ],
      quickStats: {
        type: 'Frontend Component Lab',
        architecture: 'Custom Hooks & Context',
        timing: 'Zero-Prop-Drill Pipeline'
      }
    }
  };

  const JAVA_PRACTICE_MODULES = {
    'arrays-strings': {
      id: 'arrays-strings',
      name: '01-arrays-strings',
      label: 'Arrays & Strings',
      files: ['TwoSumOptimal.java', 'SlidingWindowMaximum.java', 'TrappingRainWater.java']
    },
    'trees-graphs': {
      id: 'trees-graphs',
      name: '02-trees-graphs',
      label: 'Trees & Graphs',
      files: ['LRUCache.java', 'LowestCommonAncestor.java', 'DijkstraShortestPath.java']
    },
    'dynamic-programming': {
      id: 'dynamic-programming',
      name: '03-dynamic-programming',
      label: 'Dynamic Programming',
      files: ['CoinChange.java', 'LongestCommonSubsequence.java', 'HouseRobber.java']
    },
    'concurrency-threads': {
      id: 'concurrency-threads',
      name: '04-concurrency-threads',
      label: 'Concurrency & Multithreading',
      files: ['ProducerConsumerQueue.java', 'CustomThreadPool.java', 'DeadlockFreeTransfer.java']
    }
  };

  const JAVA_PRACTICE_FILES = {
    'TwoSumOptimal.java': {
      id: 'TwoSumOptimal.java',
      name: 'TwoSumOptimal.java',
      module: '01-arrays-strings',
      moduleKey: 'arrays-strings',
      moduleLabel: 'Arrays & Strings',
      title: 'Two Sum — Optimal One-Pass Hash Table',
      difficulty: 'Medium (Optimal)',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      summary: 'Solves the classic two-sum problem in a single linear pass by maintaining a value-to-index HashMap, eliminating brute-force quadratic O(N²) time down to optimal linear O(N) execution.',
      code: `package dsa.arrays;

import java.util.HashMap;
import java.util.Map;

/**
 * Two Sum: One-Pass Hash Table Algorithm
 * Time Complexity:  O(N) - Single pass through the array
 * Space Complexity: O(N) - Hash table stores up to N elements
 */
public class TwoSumOptimal {

    public static int[] twoSum(int[] nums, int target) {
        // Map value -> index for O(1) lookup
        Map<Integer, Integer> complementMap = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];

            // If complement exists in map, pair is found
            if (complementMap.containsKey(complement)) {
                return new int[] { complementMap.get(complement), i };
            }

            complementMap.put(nums[i], i);
        }

        throw new IllegalArgumentException("No two-sum solution found");
    }

    public static void main(String[] args) {
        int[] numbers = { 2, 7, 11, 15 };
        int target = 9;
        int[] result = twoSum(numbers, target);
        System.out.printf("Indices: [%d, %d]%n", result[0], result[1]);
    }
}`
    },
    'SlidingWindowMaximum.java': {
      id: 'SlidingWindowMaximum.java',
      name: 'SlidingWindowMaximum.java',
      module: '01-arrays-strings',
      moduleKey: 'arrays-strings',
      moduleLabel: 'Arrays & Strings',
      title: 'Sliding Window Maximum — Monotonic Deque',
      difficulty: 'Hard (Optimal)',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(K)',
      summary: 'Finds the maximum value in every sliding window of size K using a double-ended queue (ArrayDeque) maintained in monotonically decreasing order of element values.',
      code: `package dsa.arrays;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Sliding Window Maximum: Monotonic Decreasing Deque
 * Time Complexity:  O(N) - Each element added & removed at most once
 * Space Complexity: O(K) - Deque holds at most window size K
 */
public class SlidingWindowMaximum {

    public static int[] maxSlidingWindow(int[] nums, int k) {
        if (nums == null || k <= 0) return new int[0];
        int n = nums.length;
        int[] result = new int[n - k + 1];
        int resultIdx = 0;

        // Monotonic queue storing indices of maximal candidate values
        Deque<Integer> deque = new ArrayDeque<>();

        for (int i = 0; i < n; i++) {
            // 1. Evict elements outside sliding window boundaries
            while (!deque.isEmpty() && deque.peekFirst() < i - k + 1) {
                deque.pollFirst();
            }

            // 2. Maintain monotonic decreasing order (remove smaller tail items)
            while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) {
                deque.pollLast();
            }

            // 3. Push current index
            deque.offerLast(i);

            // 4. Record current window maximum once first window of size K forms
            if (i >= k - 1) {
                result[resultIdx++] = nums[deque.peekFirst()];
            }
        }

        return result;
    }
}`
    },
    'TrappingRainWater.java': {
      id: 'TrappingRainWater.java',
      name: 'TrappingRainWater.java',
      module: '01-arrays-strings',
      moduleKey: 'arrays-strings',
      moduleLabel: 'Arrays & Strings',
      title: 'Trapping Rain Water — Two-Pointer Convergence',
      difficulty: 'Hard (Optimal)',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      summary: 'Calculates the trapped rainwater volume across non-negative elevation bars in O(N) time and strictly O(1) auxiliary space using two inward converging pointers.',
      code: `package dsa.arrays;

/**
 * Trapping Rain Water: Optimal Two-Pointer Algorithm
 * Time Complexity:  O(N) - Single pass converging from ends
 * Space Complexity: O(1) - Auxiliary constant space
 */
public class TrappingRainWater {

    public static int trap(int[] height) {
        if (height == null || height.length == 0) return 0;

        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0;
        int totalWater = 0;

        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftMax) {
                    leftMax = height[left];
                } else {
                    totalWater += (leftMax - height[left]);
                }
                left++;
            } else {
                if (height[right] >= rightMax) {
                    rightMax = height[right];
                } else {
                    totalWater += (rightMax - height[right]);
                }
                right--;
            }
        }

        return totalWater;
    }
}`
    },
    'LRUCache.java': {
      id: 'LRUCache.java',
      name: 'LRUCache.java',
      module: '02-trees-graphs',
      moduleKey: 'trees-graphs',
      moduleLabel: 'Trees & Graphs',
      title: 'LRU Cache — Doubly Linked List + HashMap',
      difficulty: 'Medium (Core System Design)',
      timeComplexity: 'O(1) get & put',
      spaceComplexity: 'O(Capacity)',
      summary: 'Production-style Least Recently Used (LRU) cache providing strict O(1) amortized access and eviction by uniting a sentinel-bounded doubly linked list with a HashMap.',
      code: `package dsa.design;

import java.util.HashMap;
import java.util.Map;

/**
 * LRU Cache: Doubly Linked List + HashMap
 * Time Complexity:  O(1) amortized for both get() and put()
 * Space Complexity: O(Capacity)
 */
public class LRUCache {

    static class Node {
        int key, value;
        Node prev, next;
        Node(int k, int v) { this.key = k; this.value = v; }
    }

    private final int capacity;
    private final Map<Integer, Node> map;
    private final Node head, tail;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.map = new HashMap<>();
        this.head = new Node(-1, -1);
        this.tail = new Node(-1, -1);
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node node = map.get(key);
        removeNode(node);
        insertAtHead(node);
        return node.value;
    }

    public void put(int key, int value) {
        if (map.containsKey(key)) {
            Node existing = map.get(key);
            existing.value = value;
            removeNode(existing);
            insertAtHead(existing);
        } else {
            if (map.size() >= capacity) {
                Node lru = tail.prev;
                removeNode(lru);
                map.remove(lru.key);
            }
            Node newNode = new Node(key, value);
            map.put(key, newNode);
            insertAtHead(newNode);
        }
    }

    private void removeNode(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void insertAtHead(Node node) {
        node.next = head.next;
        node.prev = head;
        head.next.prev = node;
        head.next = node;
    }
}`
    },
    'LowestCommonAncestor.java': {
      id: 'LowestCommonAncestor.java',
      name: 'LowestCommonAncestor.java',
      module: '02-trees-graphs',
      moduleKey: 'trees-graphs',
      moduleLabel: 'Trees & Graphs',
      title: 'Lowest Common Ancestor in Binary Tree',
      difficulty: 'Medium (Tree Traversal)',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(H)',
      summary: 'Finds the lowest common ancestor node between two arbitrary nodes p and q in a Binary Tree using post-order depth-first recursion.',
      code: `package dsa.trees;

/**
 * Lowest Common Ancestor (LCA) in Binary Tree
 * Time Complexity:  O(N) - Post-order recursion visiting tree nodes
 * Space Complexity: O(H) - Recursion call stack bounded by tree height
 */
public class LowestCommonAncestor {

    public static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int x) { val = x; }
    }

    public static TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        // Base case: null node or matched target node
        if (root == null || root == p || root == q) {
            return root;
        }

        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);

        // If p and q are found in distinct subtrees, current node is LCA
        if (left != null && right != null) {
            return root;
        }

        // Return the non-null subtree result
        return (left != null) ? left : right;
    }
}`
    },
    'DijkstraShortestPath.java': {
      id: 'DijkstraShortestPath.java',
      name: 'DijkstraShortestPath.java',
      module: '02-trees-graphs',
      moduleKey: 'trees-graphs',
      moduleLabel: 'Trees & Graphs',
      title: 'Dijkstra Shortest Path — PriorityQueue Min-Heap',
      difficulty: 'Medium (Graph Optimization)',
      timeComplexity: 'O((V + E) log V)',
      spaceComplexity: 'O(V + E)',
      summary: 'Computes single-source shortest path distances on weighted directed graphs using an adjacency list model and PriorityQueue min-heap.',
      code: `package dsa.graphs;

import java.util.*;

/**
 * Dijkstra Shortest Path: Min-Heap / PriorityQueue
 * Time Complexity:  O((V + E) log V)
 * Space Complexity: O(V + E)
 */
public class DijkstraShortestPath {

    record Edge(int target, int weight) {}
    record NodeDistance(int node, int dist) implements Comparable<NodeDistance> {
        public int compareTo(NodeDistance other) {
            return Integer.compare(this.dist, other.dist);
        }
    }

    public static int[] computeShortestPaths(int n, List<List<Edge>> graph, int src) {
        int[] dist = new int[n];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;

        PriorityQueue<NodeDistance> pq = new PriorityQueue<>();
        pq.offer(new NodeDistance(src, 0));

        while (!pq.isEmpty()) {
            NodeDistance current = pq.poll();
            int u = current.node;
            int d = current.dist;

            if (d > dist[u]) continue; // Stale distance skip

            for (Edge edge : graph.get(u)) {
                int v = edge.target();
                int weight = edge.weight();

                if (dist[u] + weight < dist[v]) {
                    dist[v] = dist[u] + weight;
                    pq.offer(new NodeDistance(v, dist[v]));
                }
            }
        }
        return dist;
    }
}`
    },
    'CoinChange.java': {
      id: 'CoinChange.java',
      name: 'CoinChange.java',
      module: '03-dynamic-programming',
      moduleKey: 'dynamic-programming',
      moduleLabel: 'Dynamic Programming',
      title: 'Coin Change — Bottom-Up DP Tabulation',
      difficulty: 'Medium (Classic DP)',
      timeComplexity: 'O(N * amount)',
      spaceComplexity: 'O(amount)',
      summary: 'Solves the unbounded knapsack minimum coin change problem using bottom-up tabulation, with sentinel infinity bounds.',
      code: `package dsa.dp;

import java.util.Arrays;

/**
 * Coin Change: Bottom-Up Dynamic Programming Tabulation
 * Time Complexity:  O(N * amount) where N is number of coin denominations
 * Space Complexity: O(amount)
 */
public class CoinChange {

    public static int coinChange(int[] coins, int amount) {
        if (amount < 0) return -1;
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1); // Sentinel infinity
        dp[0] = 0; // Base case: 0 coins needed for 0 amount

        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (i - coin >= 0) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }

        return dp[amount] > amount ? -1 : dp[amount];
    }

    public static void main(String[] args) {
        int[] coins = { 1, 2, 5 };
        int amount = 11;
        System.out.printf("Min coins for %d: %d%n", amount, coinChange(coins, amount));
    }
}`
    },
    'LongestCommonSubsequence.java': {
      id: 'LongestCommonSubsequence.java',
      name: 'LongestCommonSubsequence.java',
      module: '03-dynamic-programming',
      moduleKey: 'dynamic-programming',
      moduleLabel: 'Dynamic Programming',
      title: 'Longest Common Subsequence (LCS) — 2D DP',
      difficulty: 'Medium (String DP)',
      timeComplexity: 'O(M * N)',
      spaceComplexity: 'O(N) (Optimized)',
      summary: 'Computes the length of the longest subsequence present in two given strings using a space-optimized 2-row rolling array.',
      code: `package dsa.dp;

/**
 * Longest Common Subsequence (LCS): Dynamic Programming Tabulation
 * Time Complexity:  O(M * N)
 * Space Complexity: O(N) space-optimized with two rows
 */
public class LongestCommonSubsequence {

    public static int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length(), n = text2.length();
        int[] prev = new int[n + 1];
        int[] curr = new int[n + 1];

        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                    curr[j] = prev[j - 1] + 1;
                } else {
                    curr[j] = Math.max(prev[j], curr[j - 1]);
                }
            }
            int[] temp = prev;
            prev = curr;
            curr = temp;
        }

        return prev[n];
    }
}`
    },
    'HouseRobber.java': {
      id: 'HouseRobber.java',
      name: 'HouseRobber.java',
      module: '03-dynamic-programming',
      moduleKey: 'dynamic-programming',
      moduleLabel: 'Dynamic Programming',
      title: 'House Robber — State Machine DP',
      difficulty: 'Medium (Optimal Space)',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      summary: 'Calculates maximum stealable wealth without alerting adjacent alarms using an optimal two-variable linear state transition.',
      code: `package dsa.dp;

/**
 * House Robber: Space-Optimized DP State Machine
 * Time Complexity:  O(N) - Single linear scan
 * Space Complexity: O(1) - Two tracking variables
 */
public class HouseRobber {

    public static int rob(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        if (nums.length == 1) return nums[0];

        int prev2 = 0; // Max profit skipping current house
        int prev1 = 0; // Max profit including last decision

        for (int num : nums) {
            int current = Math.max(prev1, prev2 + num);
            prev2 = prev1;
            prev1 = current;
        }

        return prev1;
    }
}`
    },
    'ProducerConsumerQueue.java': {
      id: 'ProducerConsumerQueue.java',
      name: 'ProducerConsumerQueue.java',
      module: '04-concurrency-threads',
      moduleKey: 'concurrency-threads',
      moduleLabel: 'Concurrency & Threads',
      title: 'Producer-Consumer Bounded Buffer — ReentrantLock',
      difficulty: 'Hard (Concurrency Architecture)',
      timeComplexity: 'O(1) ops',
      spaceComplexity: 'O(Capacity)',
      summary: 'Thread-safe bounded FIFO buffer built using ReentrantLock and two distinct Condition instances (notFull and notEmpty) to avoid lost wakeups.',
      code: `package dsa.concurrency;

import java.util.LinkedList;
import java.util.Queue;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;

/**
 * Producer-Consumer Bounded Queue
 * Architecture: ReentrantLock with explicit Condition signaling
 * Time Complexity:  O(1) enqueue & dequeue operations
 * Thread Safety:    Guaranteed against lost wakeups & race conditions
 */
public class ProducerConsumerQueue<T> {

    private final Queue<T> queue = new LinkedList<>();
    private final int capacity;
    private final ReentrantLock lock = new ReentrantLock(true);
    private final Condition notFull = lock.newCondition();
    private final Condition notEmpty = lock.newCondition();

    public ProducerConsumerQueue(int capacity) {
        this.capacity = capacity;
    }

    public void put(T item) throws InterruptedException {
        lock.lock();
        try {
            while (queue.size() == capacity) {
                notFull.await(); // Bounded buffer wait
            }
            queue.offer(item);
            notEmpty.signal(); // Notify waiting consumers
        } finally {
            lock.unlock();
        }
    }

    public T take() throws InterruptedException {
        lock.lock();
        try {
            while (queue.isEmpty()) {
                notEmpty.await(); // Empty buffer wait
            }
            T item = queue.poll();
            notFull.signal(); // Notify waiting producers
            return item;
        } finally {
            lock.unlock();
        }
    }
}`
    },
    'CustomThreadPool.java': {
      id: 'CustomThreadPool.java',
      name: 'CustomThreadPool.java',
      module: '04-concurrency-threads',
      moduleKey: 'concurrency-threads',
      moduleLabel: 'Concurrency & Threads',
      title: 'Custom Thread Pool Engine — Worker Threads',
      difficulty: 'Hard (Systems Concurrency)',
      timeComplexity: 'O(1) Task Dispatch',
      spaceComplexity: 'O(QueueCapacity + PoolSize)',
      summary: 'Custom worker thread pool architecture featuring pre-allocated worker threads, BlockingQueue work dispatch, and graceful shutdown semantics.',
      code: `package dsa.concurrency;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.atomic.AtomicBoolean;

/**
 * Custom Thread Pool Implementation
 * Architecture: Pre-spawned Worker threads consuming from a BlockingQueue
 * Concurrency: Thread-safe graceful shutdown with interrupt signaling
 */
public class CustomThreadPool {

    private final BlockingQueue<Runnable> taskQueue;
    private final WorkerThread[] workers;
    private final AtomicBoolean isShutdown = new AtomicBoolean(false);

    public CustomThreadPool(int poolSize, int queueCapacity) {
        this.taskQueue = new LinkedBlockingQueue<>(queueCapacity);
        this.workers = new WorkerThread[poolSize];

        for (int i = 0; i < poolSize; i++) {
            workers[i] = new WorkerThread("Worker-" + i);
            workers[i].start();
        }
    }

    public void execute(Runnable task) throws InterruptedException {
        if (isShutdown.get()) {
            throw new IllegalStateException("Thread pool has been shut down");
        }
        taskQueue.put(task);
    }

    public void shutdown() {
        isShutdown.set(true);
        for (WorkerThread worker : workers) {
            worker.interrupt();
        }
    }

    private class WorkerThread extends Thread {
        WorkerThread(String name) { super(name); }

        public void run() {
            while (!isShutdown.get() || !taskQueue.isEmpty()) {
                try {
                    Runnable task = taskQueue.take();
                    task.run();
                } catch (InterruptedException e) {
                    if (isShutdown.get() && taskQueue.isEmpty()) break;
                }
            }
        }
    }
}`
    },
    'DeadlockFreeTransfer.java': {
      id: 'DeadlockFreeTransfer.java',
      name: 'DeadlockFreeTransfer.java',
      module: '04-concurrency-threads',
      moduleKey: 'concurrency-threads',
      moduleLabel: 'Concurrency & Threads',
      title: 'Deadlock-Free Bank Transfer — Canonical Ordering',
      difficulty: 'Medium (Concurrency Patterns)',
      timeComplexity: 'O(1) Critical Section',
      spaceComplexity: 'O(1)',
      summary: 'Demonstrates guaranteed deadlock prevention in multi-account money transfer using canonical lock ordering by ID to eliminate Coffman circular wait.',
      code: `package dsa.concurrency;

import java.util.concurrent.locks.ReentrantLock;

/**
 * Deadlock-Free Concurrent Account Balance Transfer
 * Architecture: Global canonical lock ordering by Account ID
 * Concurrency: Completely eliminates circular wait condition (Coffman condition #4)
 */
public class DeadlockFreeTransfer {

    public static class Account {
        private final int id;
        private double balance;
        public final ReentrantLock lock = new ReentrantLock();

        public Account(int id, double balance) {
            this.id = id;
            this.balance = balance;
        }
        public int getId() { return id; }
        public void debit(double amt) { balance -= amt; }
        public void credit(double amt) { balance += amt; }
        public double getBalance() { return balance; }
    }

    public static boolean transfer(Account from, Account to, double amount) {
        if (from == to) return false;

        // Canonical ordering: Always acquire lower ID lock first
        Account firstLock = from.getId() < to.getId() ? from : to;
        Account secondLock = from.getId() < to.getId() ? to : from;

        firstLock.lock.lock();
        try {
            secondLock.lock.lock();
            try {
                if (from.getBalance() < amount) return false;
                from.debit(amount);
                to.credit(amount);
                return true;
            } finally {
                secondLock.lock.unlock();
            }
        } finally {
            firstLock.lock.unlock();
        }
    }
}`
    }
  };

  let currentWorkingDir = ''; // '' means root: ~/more-to-know
  let commandHistory = [];
  let historyIndex = -1;

  function initTerminalLab() {
    const section = document.getElementById('more-to-know');
    if (!section) return;

    renderTreeExplorer();
    renderWelcomeSession();
    bindEvents();
  }

  function getPromptText() {
    if (currentWorkingDir) {
      return `vansh@portfolio:~/more-to-know/${currentWorkingDir}$`;
    }
    return `vansh@portfolio:~/more-to-know$`;
  }

  function updatePromptDisplay() {
    const promptEl = document.getElementById('terminal-prompt-path');
    if (promptEl) {
      promptEl.textContent = currentWorkingDir ? `~/more-to-know/${currentWorkingDir}$` : `~/more-to-know$`;
    }
  }

  function renderTreeExplorer() {
    const wrap = document.getElementById('terminal-tree-wrap');
    if (!wrap) return;

    let html = '<div class="tree-root-item" id="tree-root-btn" style="cursor:pointer;" title="Click to go to ~/more-to-know"><span class="tree-root-icon">📁</span> <span class="tree-root-label">~/more-to-know</span></div>';
    html += '<ul class="tree-dir-list">';

    Object.keys(DIRECTORIES).forEach((dirKey, index) => {
      const dir = DIRECTORIES[dirKey];
      const isCurrent = currentWorkingDir ? currentWorkingDir.startsWith(dirKey) : (index === 0);
      html += `
        <li class="tree-dir-item ${isCurrent ? 'open' : ''}" data-dir="${dirKey}">
          <div class="tree-dir-label" data-dir="${dirKey}">
            <span class="tree-dir-arrow">▸</span>
            <span class="tree-dir-icon">${isCurrent ? '📂' : '📁'}</span>
            <span class="tree-dir-name">${dir.name}/</span>
            <span class="tree-dir-count">(${dir.repos.length})</span>
          </div>
          <ul class="tree-file-sublist">
      `;

      dir.repos.forEach(repoName => {
        if (repoName === 'Java_Practice_Code') {
          const isPracticeOpen = currentWorkingDir.includes('Java_Practice_Code');
          html += `
            <li class="tree-dir-item tree-subfolder-root ${isPracticeOpen ? 'open' : ''}" data-repo="Java_Practice_Code" data-dir="${dirKey}">
              <div class="tree-dir-label tree-practice-folder-label" data-repo="Java_Practice_Code" data-dir="${dirKey}">
                <span class="tree-dir-arrow">▸</span>
                <span class="tree-dir-icon">${isPracticeOpen ? '📂' : '📁'}</span>
                <span class="tree-dir-name">Java_Practice_Code/</span>
                <span class="tree-dir-count">(12 codes)</span>
              </div>
              <ul class="tree-file-sublist tree-subfolder-list">
          `;

          Object.keys(JAVA_PRACTICE_MODULES).forEach(modKey => {
            const mod = JAVA_PRACTICE_MODULES[modKey];
            html += `
              <li class="tree-dir-item tree-subfolder-item open" data-module="${modKey}">
                <div class="tree-dir-label tree-module-label" data-module="${modKey}">
                  <span class="tree-dir-arrow">▸</span>
                  <span class="tree-dir-icon">📂</span>
                  <span class="tree-dir-name">${mod.name}/</span>
                  <span class="tree-dir-count">(${mod.files.length})</span>
                </div>
                <ul class="tree-file-sublist tree-subfolder-list" style="display:flex;">
            `;

            mod.files.forEach(fileName => {
              const fileObj = JAVA_PRACTICE_FILES[fileName];
              if (fileObj) {
                html += `
                  <li class="tree-code-file-node" data-code="${fileName}">
                    <span class="file-bullet">├─</span>
                    <span class="file-icon-small">☕</span>
                    <span class="file-node-title">${fileName}</span>
                    <span class="file-node-tag" style="color:#4ade80;">${fileObj.timeComplexity}</span>
                  </li>
                `;
              }
            });

            html += `</ul></li>`;
          });

          html += `</ul></li>`;
        } else {
          const repo = REPOSITORIES[repoName];
          if (repo) {
            const liveTag = repo.liveUrl ? '<span class="file-node-tag" style="color:#4ade80;">🟢 Live</span>' : `<span class="file-node-tag">${repo.badge}</span>`;
            html += `
              <li class="tree-file-node" data-repo="${repo.name}" data-dir="${dirKey}">
                <span class="file-bullet">└─</span>
                <span class="file-icon-small">${repo.icon}</span>
                <span class="file-node-title">${repo.name}</span>
                ${liveTag}
              </li>
            `;
          }
        }
      });

      html += `</ul></li>`;
    });

    html += '</ul>';
    wrap.innerHTML = html;

    // Click on root directory
    const rootBtn = wrap.querySelector('#tree-root-btn');
    if (rootBtn) {
      rootBtn.addEventListener('click', () => {
        currentWorkingDir = '';
        updatePromptDisplay();
        displayCommandOutput('cd ~', '<div class="t-msg-success">Navigated to root directory <code class="t-cmd-inline">~/more-to-know</code><div class="t-muted" style="margin-top:6px;">Type <code class="t-cmd-inline">ls</code> to list available folders.</div></div>');
      });
    }

    // Click events on top-level directory folders
    wrap.querySelectorAll('.tree-dir-list > .tree-dir-item > .tree-dir-label').forEach(el => {
      el.addEventListener('click', () => {
        const dir = el.getAttribute('data-dir');
        const dirItem = el.closest('.tree-dir-item');
        const iconEl = el.querySelector('.tree-dir-icon');

        if (dirItem) {
          const isCurrentlyOpen = dirItem.classList.contains('open');
          if (isCurrentlyOpen) {
            dirItem.classList.remove('open');
            if (iconEl) iconEl.textContent = '📁';
          } else {
            dirItem.classList.add('open');
            if (iconEl) iconEl.textContent = '📂';
          }
        }

        currentWorkingDir = dir;
        updatePromptDisplay();
        displayCommandOutput(`cd ${dir}`, `<div class="t-msg-success">Entered directory <code class="t-cmd-inline">~/more-to-know/${dir}</code><div class="t-muted" style="margin-top:6px;">Type <code class="t-cmd-inline">ls</code> to list repositories, or type a repository name.</div></div>`);
      });
    });

    // Click event on Java_Practice_Code folder
    wrap.querySelectorAll('.tree-practice-folder-label').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const dirItem = el.closest('.tree-dir-item');
        const iconEl = el.querySelector('.tree-dir-icon');

        if (dirItem) {
          const isCurrentlyOpen = dirItem.classList.contains('open');
          if (isCurrentlyOpen) {
            dirItem.classList.remove('open');
            if (iconEl) iconEl.textContent = '📁';
          } else {
            dirItem.classList.add('open');
            if (iconEl) iconEl.textContent = '📂';
          }
        }

        currentWorkingDir = 'java-spring/Java_Practice_Code';
        updatePromptDisplay();
        displayCommandOutput('cd Java_Practice_Code', '<div class="t-msg-success">Entered directory <code class="t-cmd-inline">~/more-to-know/java-spring/Java_Practice_Code</code><div class="t-muted" style="margin-top:6px;">Contains 12 curated Java algorithms &amp; concurrency architectures across 4 modules. Type <code class="t-cmd-inline">ls</code> to list all code files, or <code class="t-cmd-inline">cat &lt;filename&gt;</code> (e.g. <code class="t-cmd-inline">cat LRUCache.java</code>) to inspect code.</div></div>');
      });
    });

    // Click event on module folders inside Java_Practice_Code
    wrap.querySelectorAll('.tree-module-label').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const modItem = el.closest('.tree-subfolder-item');
        const iconEl = el.querySelector('.tree-dir-icon');
        const sublist = modItem ? modItem.querySelector('.tree-subfolder-list') : null;

        if (modItem) {
          const isCurrentlyOpen = modItem.classList.contains('open');
          if (isCurrentlyOpen) {
            modItem.classList.remove('open');
            if (iconEl) iconEl.textContent = '📁';
            if (sublist) sublist.style.display = 'none';
          } else {
            modItem.classList.add('open');
            if (iconEl) iconEl.textContent = '📂';
            if (sublist) sublist.style.display = 'flex';
          }
        }
      });
    });

    // Click events on regular repository file nodes
    wrap.querySelectorAll('.tree-file-node').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const repo = el.getAttribute('data-repo');
        const dir = el.getAttribute('data-dir');
        currentWorkingDir = dir;
        updatePromptDisplay();
        highlightActiveTreeNode(dir);
        highlightActiveFileNode(repo);
        displayCommandOutput(`cat ${repo}`, executeCat(repo));
      });
    });

    // Click events on .java code files
    wrap.querySelectorAll('.tree-code-file-node').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const codeName = el.getAttribute('data-code');
        currentWorkingDir = 'java-spring/Java_Practice_Code';
        updatePromptDisplay();
        highlightActiveTreeNode('java-spring');
        expandJavaPracticeTreeNode();
        highlightActiveCodeFileNode(codeName);
        displayCommandOutput(`cat ${codeName}`, executeCat(codeName));
      });
    });
  }

  function renderWelcomeSession() {
    const historyEl = document.getElementById('terminal-history');
    if (!historyEl) return;

    historyEl.innerHTML = `
      <div class="t-standby-state">
        <div class="t-line t-standby-header">
          <span class="t-prompt">${getPromptText()}</span> <span class="t-cursor-blink">▌</span>
        </div>
        <div class="t-standby-card">
          <div class="t-standby-badge">STANDBY // CLI SESSION INITIALIZED</div>
          <p class="t-standby-desc">
            Terminal awaiting input. Type a command in the input bar above or click any repository / code file in the Explorer to inspect.
          </p>
          <div class="t-standby-commands">
            <span class="t-standby-hint">Quick commands:</span>
            <code class="t-cmd-pill" onclick="window.runTerminalCommand('ls')">ls</code>
            <code class="t-cmd-pill" onclick="window.runTerminalCommand('cd fullstack-apps')">cd fullstack-apps</code>
            <code class="t-cmd-pill" onclick="window.runTerminalCommand('cd java-spring')">cd java-spring</code>
            <code class="t-cmd-pill" onclick="window.runTerminalCommand('cd Java_Practice_Code')">cd Java_Practice_Code</code>
            <code class="t-cmd-pill" onclick="window.runTerminalCommand('help')">help</code>
          </div>
        </div>
      </div>
    `;

    const scrollEl = document.getElementById('terminal-output-scroll');
    if (scrollEl) scrollEl.scrollTop = 0;
  }

  function highlightJavaSyntax(escapedLine) {
    if (!escapedLine) return '';

    const trimmed = escapedLine.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
      return `<span class="j-comment">${escapedLine}</span>`;
    }

    let lineCode = escapedLine;
    let commentPart = '';
    const commentIdx = escapedLine.indexOf('//');
    if (commentIdx !== -1) {
      lineCode = escapedLine.substring(0, commentIdx);
      commentPart = `<span class="j-comment">${escapedLine.substring(commentIdx)}</span>`;
    }

    lineCode = lineCode.replace(/(@[A-Za-z0-9_]+)/g, '<span class="j-annotation">$1</span>');
    lineCode = lineCode.replace(/(&quot;.*?&quot;)/g, '<span class="j-string">$1</span>');

    const keywords = ['package', 'import', 'public', 'private', 'protected', 'static', 'final', 'class', 'record', 'interface', 'extends', 'implements', 'void', 'return', 'new', 'if', 'else', 'for', 'while', 'try', 'catch', 'finally', 'throw', 'throws', 'switch', 'case', 'default', 'break', 'continue', 'this', 'super'];
    const kwRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
    lineCode = lineCode.replace(kwRegex, '<span class="j-keyword">$1</span>');

    const types = ['int', 'double', 'boolean', 'char', 'byte', 'long', 'float', 'String', 'Map', 'HashMap', 'List', 'LinkedList', 'Arrays', 'Deque', 'ArrayDeque', 'PriorityQueue', 'Queue', 'TreeNode', 'Node', 'Edge', 'ReentrantLock', 'Condition', 'AtomicBoolean', 'BlockingQueue', 'LinkedBlockingQueue', 'Thread', 'Runnable', 'Comparable', 'Integer', 'Double', 'Math', 'IllegalArgumentException', 'IllegalStateException', 'InterruptedException'];
    const typeRegex = new RegExp(`\\b(${types.join('|')})\\b`, 'g');
    lineCode = lineCode.replace(typeRegex, '<span class="j-type">$1</span>');

    return lineCode + commentPart;
  }

  function renderCodeViewerHtml(fileObj) {
    if (!fileObj) return '<div class="t-error">File not found.</div>';

    const lines = fileObj.code.split('\n');
    let codeRows = '';
    lines.forEach((line, idx) => {
      const lineNum = String(idx + 1).padStart(2, '0');
      const highlighted = highlightJavaSyntax(escapeHtml(line));
      codeRows += `
        <div class="code-line">
          <span class="code-line-no">${lineNum}</span>
          <span class="code-line-content">${highlighted}</span>
        </div>
      `;
    });

    return `
      <article class="terminal-inspect-card code-viewer-card">
        <div class="inspect-top-meta">
          <div class="inspect-title-group">
            <span class="inspect-path-crumb">☕ SOURCE: ~/java-spring/Java_Practice_Code/${fileObj.module}/${fileObj.name}</span>
            <h3 class="inspect-heading">${fileObj.title}</h3>
          </div>
          <span class="inspect-status-pill">${fileObj.difficulty}</span>
        </div>

        <p class="inspect-overview">${fileObj.summary}</p>

        <div class="inspect-specs-row">
          <div class="spec-cell">
            <span class="spec-cell-dim">TIME COMPLEXITY</span>
            <span class="spec-cell-bright" style="color: #4ade80;">${fileObj.timeComplexity}</span>
          </div>
          <div class="spec-cell">
            <span class="spec-cell-dim">SPACE COMPLEXITY</span>
            <span class="spec-cell-bright" style="color: #38bdf8;">${fileObj.spaceComplexity}</span>
          </div>
          <div class="spec-cell">
            <span class="spec-cell-dim">MODULE CATEGORY</span>
            <span class="spec-cell-bright">${fileObj.moduleLabel}</span>
          </div>
        </div>

        <div class="code-editor-frame">
          <div class="code-editor-topbar">
            <span class="code-tab-active"><span class="j-icon">☕</span> ${fileObj.name}</span>
            <span class="code-lang-tag">Java 17 &bull; UTF-8</span>
          </div>
          <div class="code-editor-viewport">
            <div class="code-editor-body">
              ${codeRows}
            </div>
          </div>
        </div>

        <div class="inspect-actions-row">
          <a href="https://github.com/vansh16soni/Java_Practice_Code" target="_blank" rel="noopener noreferrer" class="btn-primary-editorial" style="text-decoration:none; padding:8px 18px; font-size:0.76rem;">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 19.91 1z"/></svg>
            <span>VIEW REPOSITORY ON GITHUB ↗</span>
          </a>
          <button type="button" class="btn-terminal-exec" onclick="window.runTerminalCommand('cd Java_Practice_Code')" style="padding:7px 14px; font-size:0.74rem;">
            <span>BACK TO ALL CODES (ls) ↩</span>
          </button>
        </div>
      </article>
    `;
  }

  function renderDossierHtml(repo) {
    if (!repo) return '<div class="t-error">File not found.</div>';

    const techPills = repo.techStack.map(t => `<span class="tech-stamp">${t}</span>`).join(' ');
    const archBullets = repo.architecture.map(a => `<li><span class="bullet-arrow">▸</span><span>${a}</span></li>`).join('');

    const liveBtn = repo.liveUrl
      ? `<a href="${repo.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-live-preview" style="padding:7px 15px; font-size:0.75rem;">
           <span class="pulse-dot-green"></span>
           <span>LIVE DEPLOYMENT ↗</span>
         </a>`
      : '';

    const isPracticeRepo = repo.id === 'Java_Practice_Code';
    const practiceExploreBtn = isPracticeRepo
      ? `<button type="button" class="btn-terminal-exec" onclick="window.runTerminalCommand('ls')" style="padding:8px 16px; font-size:0.76rem; background:rgba(56,189,248,0.2); border-color:#38bdf8; color:#38bdf8;">
           <span>EXPLORE 12 CODES (ls) ☕</span>
         </button>`
      : '';

    return `
      <article class="terminal-inspect-card">
        <div class="inspect-top-meta">
          <div class="inspect-title-group">
            <span class="inspect-path-crumb">📄 FILE: ~/${repo.category}/${repo.name}/README.md &bull; [${repo.badge}]</span>
            <h3 class="inspect-heading">${repo.title}</h3>
          </div>
          <span class="inspect-status-pill">${repo.stars}</span>
        </div>

        <p class="inspect-overview">${repo.description}</p>

        <div class="inspect-specs-row">
          <div class="spec-cell">
            <span class="spec-cell-dim">SYSTEM TYPE</span>
            <span class="spec-cell-bright">${repo.quickStats.type}</span>
          </div>
          <div class="spec-cell">
            <span class="spec-cell-dim">CORE ARCHITECTURE</span>
            <span class="spec-cell-bright">${repo.quickStats.architecture}</span>
          </div>
          <div class="spec-cell">
            <span class="spec-cell-dim">EXECUTION PROFILE</span>
            <span class="spec-cell-bright">${repo.quickStats.timing}</span>
          </div>
        </div>

        <div class="inspect-block">
          <span class="inspect-subhead">ENGINEERED HIGHLIGHTS // README ARCHITECTURE</span>
          <ul class="inspect-bullets">${archBullets}</ul>
        </div>

        <div class="inspect-block">
          <span class="inspect-subhead">TECHNOLOGY STACK</span>
          <div class="inspect-pills-row">${techPills}</div>
        </div>

        <div class="inspect-actions-row">
          <a href="${repo.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary-editorial" style="text-decoration:none; padding:8px 18px; font-size:0.76rem;">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 19.91 1z"/></svg>
            <span>OPEN GITHUB REPOSITORY ↗</span>
          </a>
          ${liveBtn}
          ${practiceExploreBtn}
        </div>
      </article>
    `;
  }

  function normalizeString(str) {
    return (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  function levenshtein(a, b) {
    const s1 = (a || '').toLowerCase();
    const s2 = (b || '').toLowerCase();
    const m = s1.length;
    const n = s2.length;
    if (m === 0) return n;
    if (n === 0) return m;

    const row = [];
    for (let j = 0; j <= n; j++) row[j] = j;

    for (let i = 1; i <= m; i++) {
      let prev = i;
      for (let j = 1; j <= n; j++) {
        let val;
        if (s1[i - 1] === s2[j - 1]) {
          val = row[j - 1];
        } else {
          val = Math.min(row[j - 1] + 1, prev + 1, row[j] + 1);
        }
        row[j - 1] = prev;
        prev = val;
      }
      row[n] = prev;
    }
    return row[n];
  }

  function resolveCodeFile(query) {
    if (!query) return null;
    const clean = query.trim();
    if (!clean) return null;

    if (JAVA_PRACTICE_FILES[clean]) return JAVA_PRACTICE_FILES[clean];

    const lower = clean.toLowerCase();
    for (const key of Object.keys(JAVA_PRACTICE_FILES)) {
      if (key.toLowerCase() === lower) return JAVA_PRACTICE_FILES[key];
    }

    const cleanNorm = normalizeString(clean.replace(/\.java$/i, ''));
    for (const key of Object.keys(JAVA_PRACTICE_FILES)) {
      const keyNorm = normalizeString(key.replace(/\.java$/i, ''));
      if (keyNorm === cleanNorm) return JAVA_PRACTICE_FILES[key];
    }

    const aliases = {
      'twosum': 'TwoSumOptimal.java',
      'slidingwindow': 'SlidingWindowMaximum.java',
      'sliding': 'SlidingWindowMaximum.java',
      'rain': 'TrappingRainWater.java',
      'trapping': 'TrappingRainWater.java',
      'lru': 'LRUCache.java',
      'lrucache': 'LRUCache.java',
      'cache': 'LRUCache.java',
      'lca': 'LowestCommonAncestor.java',
      'ancestor': 'LowestCommonAncestor.java',
      'dijkstra': 'DijkstraShortestPath.java',
      'shortestpath': 'DijkstraShortestPath.java',
      'coin': 'CoinChange.java',
      'coinchange': 'CoinChange.java',
      'lcs': 'LongestCommonSubsequence.java',
      'subsequence': 'LongestCommonSubsequence.java',
      'robber': 'HouseRobber.java',
      'houserobber': 'HouseRobber.java',
      'producerconsumer': 'ProducerConsumerQueue.java',
      'queue': 'ProducerConsumerQueue.java',
      'threadpool': 'CustomThreadPool.java',
      'pool': 'CustomThreadPool.java',
      'deadlock': 'DeadlockFreeTransfer.java',
      'transfer': 'DeadlockFreeTransfer.java'
    };

    if (aliases[cleanNorm]) {
      return JAVA_PRACTICE_FILES[aliases[cleanNorm]];
    }

    for (const key of Object.keys(JAVA_PRACTICE_FILES)) {
      const keyNorm = normalizeString(key.replace(/\.java$/i, ''));
      if (cleanNorm.length >= 3 && (keyNorm.includes(cleanNorm) || cleanNorm.includes(keyNorm))) {
        return JAVA_PRACTICE_FILES[key];
      }
    }

    let bestMatch = null;
    let minDistance = Infinity;
    for (const key of Object.keys(JAVA_PRACTICE_FILES)) {
      const keyNorm = normalizeString(key.replace(/\.java$/i, ''));
      const dist = levenshtein(cleanNorm, keyNorm);
      if (dist <= 3 && dist < minDistance) {
        minDistance = dist;
        bestMatch = JAVA_PRACTICE_FILES[key];
      }
    }

    return bestMatch;
  }

  function resolveRepository(query) {
    if (!query) return null;
    const clean = query.trim();
    if (!clean) return null;

    if (REPOSITORIES[clean]) return REPOSITORIES[clean];

    const lower = clean.toLowerCase();
    for (const key of Object.keys(REPOSITORIES)) {
      if (key.toLowerCase() === lower) return REPOSITORIES[key];
    }

    const norm = normalizeString(clean);
    for (const key of Object.keys(REPOSITORIES)) {
      if (normalizeString(key) === norm) return REPOSITORIES[key];
    }

    const aliases = {
      'theif': 'King-Theif',
      'thief': 'King-Theif',
      'rmcs': 'King-Theif',
      'raja': 'King-Theif',
      'king': 'King-Theif',
      'hcl': 'HCL_Nova',
      'learnwise': 'HCL_Nova',
      'nova': 'HCL_Nova',
      'teamnova': 'TeamNova',
      'pixel': 'Pixel_Arena',
      'arena': 'Pixel_Arena',
      'minor': 'minor-project',
      'capstone': 'minor-project',
      'lib': 'LibManage_Java',
      'libmanage': 'LibManage_Java',
      'lms': 'LibManage_Java',
      'javamini': 'Java_Mini_Projects',
      'miniprojects': 'Java_Mini_Projects',
      'javapractice': 'Java_Practice_Code',
      'practice': 'Java_Practice_Code',
      'peactice': 'Java_Practice_Code',
      'dsa': 'Java_Practice_Code',
      'sins': '7_Sins',
      'sevensins': '7_Sins',
      '7sin': '7_Sins',
      'reactpractice': 'React_practice_projects',
      'react': 'React_practice_projects'
    };

    if (aliases[norm]) {
      return REPOSITORIES[aliases[norm]];
    }

    for (const key of Object.keys(REPOSITORIES)) {
      const keyNorm = normalizeString(key);
      if (norm.length >= 3 && (keyNorm.includes(norm) || norm.includes(keyNorm))) {
        return REPOSITORIES[key];
      }
    }

    let bestMatch = null;
    let minDistance = Infinity;
    for (const key of Object.keys(REPOSITORIES)) {
      const keyNorm = normalizeString(key);
      const dist = levenshtein(norm, keyNorm);
      const threshold = norm.length > 8 ? 3 : 2;
      if (dist <= threshold && dist < minDistance) {
        minDistance = dist;
        bestMatch = REPOSITORIES[key];
      }
    }

    return bestMatch;
  }

  function resolveDirectory(query) {
    if (!query) return null;
    const clean = query.trim().replace(/\/$/, '');
    if (!clean) return null;

    if (DIRECTORIES[clean]) return DIRECTORIES[clean];

    const lower = clean.toLowerCase();
    for (const key of Object.keys(DIRECTORIES)) {
      if (key.toLowerCase() === lower) return DIRECTORIES[key];
    }

    const norm = normalizeString(clean);
    for (const key of Object.keys(DIRECTORIES)) {
      if (normalizeString(key) === norm) return DIRECTORIES[key];
    }

    const aliases = {
      'fullstack': 'fullstack-apps',
      'fullstackapps': 'fullstack-apps',
      'apps': 'fullstack-apps',
      'java': 'java-spring',
      'spring': 'java-spring',
      'javaspring': 'java-spring',
      'games': 'games-creative',
      'creative': 'games-creative',
      'gamescreative': 'games-creative'
    };
    if (aliases[norm]) return DIRECTORIES[aliases[norm]];

    for (const key of Object.keys(DIRECTORIES)) {
      const keyNorm = normalizeString(key);
      if (norm.length >= 3 && (keyNorm.includes(norm) || norm.includes(keyNorm))) {
        return DIRECTORIES[key];
      }
    }

    for (const key of Object.keys(DIRECTORIES)) {
      const keyNorm = normalizeString(key);
      if (levenshtein(norm, keyNorm) <= 2) {
        return DIRECTORIES[key];
      }
    }

    return null;
  }

  function displayCommandOutput(cmdText, outputHtml) {
    const historyEl = document.getElementById('terminal-history');
    if (!historyEl) return;

    historyEl.innerHTML = `
      <div class="t-history-entry">
        <div class="t-line t-entered-cmd">
          <span class="t-prompt">${getPromptText()}</span> <span class="t-cmd-text">${escapeHtml(cmdText)}</span>
        </div>
        <div class="t-line t-output-result">
          ${outputHtml}
        </div>
      </div>
    `;

    const scrollEl = document.getElementById('terminal-output-scroll');
    if (scrollEl) {
      scrollEl.scrollTop = 0;
    }
  }

  function executeLs() {
    if (!currentWorkingDir) {
      let html = '<div class="t-dir-grid">';
      Object.keys(DIRECTORIES).forEach(k => {
        const d = DIRECTORIES[k];
        html += `
          <div class="t-dir-chip" onclick="window.runTerminalCommand('cd ${d.name}')">
            <span class="t-dir-badge">DIR</span>
            <span class="t-dir-title">${d.name}/</span>
            <span class="t-dir-sub">${d.repos.length} repositories</span>
          </div>
        `;
      });
      html += '</div>';
      return html;
    } else if (currentWorkingDir.includes('Java_Practice_Code')) {
      let html = '<div class="t-files-grid">';
      Object.keys(JAVA_PRACTICE_FILES).forEach(fileName => {
        const f = JAVA_PRACTICE_FILES[fileName];
        html += `
          <div class="t-file-card" onclick="window.runTerminalCommand('cat ${fileName}')">
            <span class="t-file-icon">☕</span>
            <div class="t-file-info">
              <span class="t-file-title">${f.name}</span>
              <span class="t-file-desc">${f.moduleLabel} &bull; <strong style="color:#4ade80;">${f.timeComplexity}</strong></span>
            </div>
            <span class="t-inspect-btn">cat ↗</span>
          </div>
        `;
      });
      html += '</div>';
      return html;
    } else {
      const dir = DIRECTORIES[currentWorkingDir];
      if (!dir) return '<div class="t-error">Directory not found.</div>';

      let html = `<div class="t-files-grid">`;
      dir.repos.forEach(name => {
        const repo = REPOSITORIES[name];
        const isPractice = name === 'Java_Practice_Code';
        const hasLive = !!repo.liveUrl;
        const btnText = hasLive ? '<span class="pulse-dot-green" style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#4ade80;margin-right:4px;"></span>LIVE ↗' : (isPractice ? 'cd ↗' : 'cat ↗');
        html += `
          <div class="t-file-card" onclick="window.runTerminalCommand('${isPractice ? 'cd' : 'cat'} ${name}')">
            <span class="t-file-icon">${repo.icon}</span>
            <div class="t-file-info">
              <span class="t-file-title">${repo.name}${isPractice ? '/' : ''}</span>
              <span class="t-file-desc">${repo.badge} &bull; ${isPractice ? '12 Practice Programs' : repo.lang}</span>
            </div>
            <span class="t-inspect-btn">${btnText}</span>
          </div>
        `;
      });
      html += `</div>`;
      return html;
    }
  }

  function executeCd(target) {
    const raw = (target || '').trim();

    if (!raw || raw === '~' || raw === '/') {
      currentWorkingDir = '';
      updatePromptDisplay();
      highlightActiveTreeNode('');
      return '<div class="t-msg-success">Navigated to root directory <code class="t-cmd-inline">~/more-to-know</code><div class="t-muted" style="margin-top:6px;">Type <code class="t-cmd-inline">ls</code> to list available folders, or enter a folder name.</div></div>';
    }

    if (raw === '..') {
      if (currentWorkingDir.includes('Java_Practice_Code')) {
        currentWorkingDir = 'java-spring';
        updatePromptDisplay();
        highlightActiveTreeNode('java-spring');
        return '<div class="t-msg-success">Navigated to <code class="t-cmd-inline">~/more-to-know/java-spring</code><div class="t-muted" style="margin-top:6px;">Type <code class="t-cmd-inline">ls</code> to list repositories.</div></div>';
      } else {
        currentWorkingDir = '';
        updatePromptDisplay();
        highlightActiveTreeNode('');
        return '<div class="t-msg-success">Navigated to root directory <code class="t-cmd-inline">~/more-to-know</code><div class="t-muted" style="margin-top:6px;">Type <code class="t-cmd-inline">ls</code> to list available folders.</div></div>';
      }
    }

    const norm = normalizeString(raw);
    if (norm.includes('javapractice') || norm === 'practice' || norm === 'peactice') {
      currentWorkingDir = 'java-spring/Java_Practice_Code';
      updatePromptDisplay();
      highlightActiveTreeNode('java-spring');
      expandJavaPracticeTreeNode();
      return '<div class="t-msg-success">Entered directory <code class="t-cmd-inline">~/more-to-know/java-spring/Java_Practice_Code</code><div class="t-muted" style="margin-top:6px;">Contains 12 curated Java algorithms &amp; concurrency architectures across 4 modules. Type <code class="t-cmd-inline">ls</code> to list all code files, or <code class="t-cmd-inline">cat &lt;filename&gt;</code> (e.g. <code class="t-cmd-inline">cat LRUCache.java</code>) to inspect code.</div></div>';
    }

    const codeFile = resolveCodeFile(raw);
    if (codeFile) {
      currentWorkingDir = 'java-spring/Java_Practice_Code';
      updatePromptDisplay();
      highlightActiveTreeNode('java-spring');
      expandJavaPracticeTreeNode();
      highlightActiveCodeFileNode(codeFile.name);
      return renderCodeViewerHtml(codeFile);
    }

    const matchedDir = resolveDirectory(raw);
    if (matchedDir) {
      currentWorkingDir = matchedDir.name;
      updatePromptDisplay();
      highlightActiveTreeNode(matchedDir.name);
      return `<div class="t-msg-success">Entered directory <code class="t-cmd-inline">~/more-to-know/${matchedDir.name}</code><div class="t-muted" style="margin-top:6px;">Type <code class="t-cmd-inline">ls</code> to list repositories, or type a repository name.</div></div>`;
    }

    const matchedRepo = resolveRepository(raw);
    if (matchedRepo) {
      if (matchedRepo.id === 'Java_Practice_Code') {
        currentWorkingDir = 'java-spring/Java_Practice_Code';
        updatePromptDisplay();
        highlightActiveTreeNode('java-spring');
        expandJavaPracticeTreeNode();
        return '<div class="t-msg-success">Entered directory <code class="t-cmd-inline">~/more-to-know/java-spring/Java_Practice_Code</code><div class="t-muted" style="margin-top:6px;">Contains 12 curated Java algorithms &amp; concurrency architectures across 4 modules. Type <code class="t-cmd-inline">ls</code> to list all code files, or <code class="t-cmd-inline">cat &lt;filename&gt;</code> (e.g. <code class="t-cmd-inline">cat LRUCache.java</code>) to inspect code.</div></div>';
      }
      currentWorkingDir = matchedRepo.category;
      updatePromptDisplay();
      highlightActiveTreeNode(matchedRepo.category);
      highlightActiveFileNode(matchedRepo.name);
      return renderDossierHtml(matchedRepo);
    }

    return `<div class="t-error">cd: no such file or directory: ${escapeHtml(raw)}. Type <code class="t-cmd-inline">ls</code> to view available folders.</div>`;
  }

  function executeCat(target) {
    const clean = (target || '').trim();
    if (!clean) {
      return '<div class="t-error">cat: missing filename. Usage: <code class="t-cmd-inline">cat &lt;filename&gt;</code></div>';
    }

    const codeFile = resolveCodeFile(clean);
    if (codeFile) {
      currentWorkingDir = 'java-spring/Java_Practice_Code';
      updatePromptDisplay();
      highlightActiveTreeNode('java-spring');
      expandJavaPracticeTreeNode();
      highlightActiveCodeFileNode(codeFile.name);
      return renderCodeViewerHtml(codeFile);
    }

    const repo = resolveRepository(clean);
    if (repo) {
      if (repo.id === 'Java_Practice_Code') {
        currentWorkingDir = 'java-spring/Java_Practice_Code';
        updatePromptDisplay();
        highlightActiveTreeNode('java-spring');
        expandJavaPracticeTreeNode();
        return renderDossierHtml(repo);
      }
      currentWorkingDir = repo.category;
      updatePromptDisplay();
      highlightActiveTreeNode(repo.category);
      highlightActiveFileNode(repo.name);
      return renderDossierHtml(repo);
    }

    const dir = resolveDirectory(clean);
    if (dir) {
      currentWorkingDir = dir.name;
      updatePromptDisplay();
      highlightActiveTreeNode(dir.name);
      return `<div class="t-msg-success">Directory <code class="t-cmd-inline">~/${dir.name}</code>:</div>${executeLs()}`;
    }

    return `<div class="t-error">cat: ${escapeHtml(clean)}: No such file or repository. Type <code class="t-cmd-inline">ls</code> to list available files.</div>`;
  }

  function executeHelp() {
    return `
      <div class="t-help-box">
        <span class="t-help-title">🏎️ APEX DEVELOPER COMMAND LINE // REFERENCE GUIDE</span>
        <table class="t-help-table">
          <tr><td class="cmd-cell">ls / dir</td><td>List repositories, modules, or codes in current folder</td></tr>
          <tr><td class="cmd-cell">cd &lt;dir&gt;</td><td>Change directory (<code class="t-cmd-inline">cd fullstack-apps</code>, <code class="t-cmd-inline">cd java-spring</code>, <code class="t-cmd-inline">cd Java_Practice_Code</code>)</td></tr>
          <tr><td class="cmd-cell">cd ..</td><td>Navigate up one directory level</td></tr>
          <tr><td class="cmd-cell">cat &lt;file.java&gt;</td><td>Inspect syntax-highlighted code (<code class="t-cmd-inline">cat LRUCache.java</code>, <code class="t-cmd-inline">cat TwoSumOptimal.java</code>)</td></tr>
          <tr><td class="cmd-cell">cat &lt;repo&gt;</td><td>Inspect repository specifications, architecture, and live links</td></tr>
          <tr><td class="cmd-cell">clear / cls</td><td>Clear the terminal screen</td></tr>
          <tr><td class="cmd-cell">help</td><td>Display this command manual</td></tr>
        </table>
        <div class="t-tip-line" style="margin-top:8px;">💡 You can also directly click any directory, repository, or .java file in the left Explorer tree!</div>
      </div>
    `;
  }

  function processCommand(rawInput) {
    const input = (rawInput || '').trim();
    if (!input) return;

    commandHistory.push(input);
    historyIndex = commandHistory.length;

    const parts = input.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ');

    let resultHtml = '';

    if (cmd === 'clear' || cmd === 'cls') {
      const historyEl = document.getElementById('terminal-history');
      if (historyEl) historyEl.innerHTML = '';
      return;
    } else if (cmd === 'ls' || cmd === 'dir') {
      resultHtml = executeLs();
    } else if (cmd === 'cd') {
      resultHtml = executeCd(arg);
    } else if (cmd === 'cat' || cmd === 'open' || cmd === 'inspect') {
      resultHtml = executeCat(arg);
    } else if (cmd === 'help') {
      resultHtml = executeHelp();
    } else {
      const codeFile = resolveCodeFile(input);
      const matchedRepo = resolveRepository(input);
      const matchedDir = resolveDirectory(input);

      if (codeFile) {
        resultHtml = executeCat(input);
      } else if (matchedRepo) {
        resultHtml = executeCat(input);
      } else if (matchedDir) {
        resultHtml = executeCd(input);
      } else {
        resultHtml = `<div class="t-error">Command not recognized: <code>${escapeHtml(input)}</code>. Type <code class="t-cmd-pill" onclick="window.runTerminalCommand('help')">help</code> for list of commands.</div>`;
      }
    }

    displayCommandOutput(input, resultHtml);
  }

  window.submitTerminalInput = function () {
    const inputEl = document.getElementById('terminal-cli-input');
    if (!inputEl) return;
    const val = inputEl.value;
    inputEl.value = '';
    processCommand(val);
    inputEl.focus();
  };

  window.runTerminalCommand = function (cmdStr) {
    const inputEl = document.getElementById('terminal-cli-input');
    if (inputEl) {
      inputEl.value = cmdStr;
    }
    processCommand(cmdStr);
    if (inputEl) {
      inputEl.value = '';
      inputEl.focus();
    }
  };

  function highlightActiveTreeNode(dirKey) {
    const wrap = document.getElementById('terminal-tree-wrap');
    if (!wrap) return;
    wrap.querySelectorAll('.tree-dir-list > .tree-dir-item').forEach(el => {
      const match = el.getAttribute('data-dir') === dirKey;
      const iconEl = el.querySelector('.tree-dir-icon');
      if (match) {
        el.classList.add('open');
        if (iconEl) iconEl.textContent = '📂';
      }
    });
  }

  function expandJavaPracticeTreeNode() {
    const wrap = document.getElementById('terminal-tree-wrap');
    if (!wrap) return;
    const practiceNode = wrap.querySelector('.tree-subfolder-root');
    if (practiceNode) {
      practiceNode.classList.add('open');
      const iconEl = practiceNode.querySelector('.tree-dir-icon');
      if (iconEl) iconEl.textContent = '📂';
    }
  }

  function highlightActiveFileNode(repoName) {
    const wrap = document.getElementById('terminal-tree-wrap');
    if (!wrap) return;
    wrap.querySelectorAll('.tree-file-node').forEach(el => {
      el.classList.toggle('active', el.getAttribute('data-repo') === repoName);
    });
    wrap.querySelectorAll('.tree-code-file-node').forEach(el => {
      el.classList.remove('active');
    });
  }

  function highlightActiveCodeFileNode(codeName) {
    const wrap = document.getElementById('terminal-tree-wrap');
    if (!wrap) return;
    wrap.querySelectorAll('.tree-file-node').forEach(el => {
      el.classList.remove('active');
    });
    wrap.querySelectorAll('.tree-code-file-node').forEach(el => {
      el.classList.toggle('active', el.getAttribute('data-code') === codeName);
    });
  }

  function escapeHtml(str) {
    return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function bindEvents() {
    const inputEl = document.getElementById('terminal-cli-input');
    if (!inputEl) return;

    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = inputEl.value;
        inputEl.value = '';
        processCommand(val);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
          historyIndex--;
          inputEl.value = commandHistory[historyIndex] || '';
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++;
          inputEl.value = commandHistory[historyIndex] || '';
        } else {
          historyIndex = commandHistory.length;
          inputEl.value = '';
        }
      }
    });

    const screenEl = document.getElementById('terminal-screen');
    if (screenEl) {
      screenEl.addEventListener('click', (e) => {
        if (e.target.closest('a') || e.target.closest('button')) return;
        inputEl.focus();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTerminalLab);
  } else {
    initTerminalLab();
  }
})();
