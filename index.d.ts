declare module "perspective-api-client" {
  type Attribute =
    | "TOXICITY"
    | "TOXICITY_EXPERIMENTAL"
    | "SEVERE_TOXICITY"
    | "SEVERE_TOXICITY_EXPERIMENTAL"
    | "TOXICITY_FAST"
    | "IDENTITY_ATTACK"
    | "IDENTITY_ATTACK_EXPERIMENTAL"
    | "INSULT"
    | "INSULT_EXPERIMENTAL"
    | "PROFANITY"
    | "PROFANITY_EXPERIMENTAL"
    | "THREAT"
    | "THREAT_EXPERIMENTAL"
    | "SEXUALLY_EXPLICIT"
    | "FLIRTATION"
    | "ATTACK_ON_AUTHOR"
    | "ATTACK_ON_COMMENTER"
    | "INCOHERENT"
    | "INFLAMMATORY"
    | "LIKELY_TO_REJECT"
    | "OBSCENE"
    | "SPAM"
    | "UNSUBSTANTIAL";

  type Language = "en" | "fr" | "es" | "de" | "it" | "pt" | "ru" | "ar";

  type Result = {
    attributeScores: {
      [K in Attribute]: {
        spanScores: {
          begin: number;
          end: number;
          score: { value: number; type: "PROBABILITY" };
        }[];
        summaryScore: { value: number; type: "PROBABILITY" };
      };
    };
    languages: Language[];
    detectedLanguages: Language[];
  };

  export default class Perspective {
    constructor(options: { apiKey: string });

    /**
     * @param text Either the text to analyze or an AnalyzeComment object. HTML tags will be stripped by default
     * @param options
     *
     * **attributes**
     *
     * Type: Array or Object
     *
     * Model names to analyze. TOXICITY is analyzed by default. If passing an Array of names, the names may be lowercased. See https://github.com/conversationai/perspectiveapi/blob/master/api_reference.md#models for a list of valid models.
     *
     * **doNotStore**
     *
     * Type: Boolean Default: true
     *
     * If true, prevent API from storing comment and context from this request.
     *
     * **stripHTML**
     *
     * Type: Boolean Default: true
     *
     * Whether to strip HTML tags from the text.
     *
     * **truncate**
     *
     * Type: Boolean Default: false
     *
     * If true, truncate text to the first 20480 characters (max length allowed by the Perspective API).
     */
    analyze(
      text: string,
      options?: {
        attributes: Attribute[];
        doNotStore: boolean;
        stripHTML: boolean;
        truncate: boolean;
      }
    ): Promise<Result>;
  }
}
